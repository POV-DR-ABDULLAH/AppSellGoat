import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { FiUser, FiUpload } from 'react-icons/fi'

function UserPage() {
  const [user, setUser] = useState(null)
  const [avatarUrl, setAvatarUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user || null)
      const url = session?.user?.user_metadata?.avatar_url || ''
      setAvatarUrl(url)
    }
    init()

    const { data: listener } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user || null)
      setAvatarUrl(session?.user?.user_metadata?.avatar_url || '')
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    setMessage('')
    setError('')
    setProgress(0)
    try {
      const bucketName = import.meta.env.VITE_AVATAR_BUCKET || 'avatars'
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}.${fileExt}`

      // Prepare REST upload with progress via XHR
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData?.session?.access_token
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      const uploadUrl = `${supabaseUrl}/storage/v1/object/${encodeURIComponent(bucketName)}/${encodeURIComponent(fileName)}`

      // Preflight: verify bucket exists/access
      const { error: bucketError } = await supabase.storage.from(bucketName).list()
      if (bucketError) {
        throw new Error(`Bucket '${bucketName}' not found or no access. Please create it in Supabase Storage and ensure policies allow authenticated uploads. Detail: ${bucketError.message}`)
      }

      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', uploadUrl)
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
        xhr.setRequestHeader('apikey', anonKey)
        xhr.setRequestHeader('x-upsert', 'true')
        if (file.type) xhr.setRequestHeader('Content-Type', file.type)

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100)
            setProgress(percent)
          }
        }

        xhr.onerror = () => reject(new Error('Upload failed'))
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve()
          } else {
            const msg = xhr.responseText ? `${xhr.status}: ${xhr.responseText}` : `Upload failed with status ${xhr.status}`
            reject(new Error(msg))
          }
        }

        xhr.send(file)
      })

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(fileName)
      const publicUrl = publicUrlData.publicUrl

      // Save to user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      })
      if (updateError) throw updateError

      setAvatarUrl(publicUrl)
      setMessage('Avatar updated successfully!')
    } catch (err) {
      setError(err.message || 'Failed to upload avatar')
    } finally {
      setUploading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white border rounded-lg shadow p-8 text-center max-w-md w-full">
          <p className="text-gray-700">You are not logged in.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white border rounded-lg shadow p-8 max-w-lg w-full">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">User Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <FiUser className="text-white" size={36} />
            )}
          </div>
          <div>
            <p className="text-gray-800 font-medium">{user.email}</p>
            <p className="text-gray-500 text-sm">Update your avatar</p>
          </div>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-800">
          <FiUpload />
          <span>{uploading ? 'Uploading...' : 'Upload new avatar'}</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
        </label>

        {uploading && (
          <div className="mt-4">
            <div className="w-full h-3 bg-gray-200 rounded">
              <div className="h-3 bg-gray-700 rounded" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-1">{progress}%</p>
          </div>
        )}

        {message && <p className="mt-4 text-green-700">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  )
}

export default UserPage
