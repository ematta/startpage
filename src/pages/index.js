import * as React from "react"

export default function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8f9fa',
      color: '#333'
    }}>
      <div style={{
        fontSize: '1.5rem',
        marginBottom: '2rem',
        fontWeight: '300',
        maxWidth: '600px',
        lineHeight: '1.5'
      }}>
        Hello world! This is Enrique Matta's page. It's simple, just like I like it.
      </div>
      <div id="links" style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <a href="https://blog.matta.dev" style={{
          textDecoration: 'none',
          color: '#0077cc',
          fontSize: '1.2rem',
          transition: 'color 0.2s ease',
          padding: '0.5rem 1rem',
          borderRadius: '4px'
        }}>Blog</a>
        <a href="https://github.com/ematta" style={{
          textDecoration: 'none',
          color: '#0077cc',
          fontSize: '1.2rem',
          transition: 'color 0.2s ease',
          padding: '0.5rem 1rem',
          borderRadius: '4px'
        }}>GitHub</a>
        <a href="https://linkedin.com/in/enriquematta" style={{
          textDecoration: 'none',
          color: '#0077cc',
          fontSize: '1.2rem',
          transition: 'color 0.2s ease',
          padding: '0.5rem 1rem',
          borderRadius: '4px'
        }}>LinkedIn</a>
      </div>
    </div>
  )
}
