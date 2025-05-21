import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()

  if (!user) {
    return (
      <main className={styles.main}>
        <Auth
          redirectTo="http://localhost:3000/"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
        />
      </main>
    )
  }

  return (
    <>
      <button onClick={() => supabaseClient.auth.signOut()}>Sign out</button>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  )
}
const HCAPTCHA_SITE_KEY = '3be4e9f2-b542-4e2c-ab9e-81a05d348b78';
export default LoginPage
