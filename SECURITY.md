# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest (main branch) | ✅ Yes |
| Older versions | ❌ No |

## Reporting a Vulnerability

If you discover a security vulnerability in FlixBase, please do **not** open a public GitHub issue.

Instead, please report it privately by:

1. Going to the **Security** tab on this GitHub repository
2. Clicking **"Report a vulnerability"**
3. Filling in the details

Or contact the maintainer directly through GitHub.

## What to Include in Your Report

Please provide as much of the following as possible:

- Type of vulnerability (e.g. XSS, SQL injection, exposed credentials)
- Location of the vulnerable code (file name and line number if known)
- Steps to reproduce the issue
- Potential impact of the vulnerability
- Any suggested fix if you have one

## Response Timeline

- You will receive an acknowledgement within **48 hours**
- A fix will be worked on as soon as possible
- You will be credited in the fix if you wish

## Important Notes

- **Never commit `.env.local`** — this file contains your Supabase secret keys
- The `.gitignore` file already blocks it, but double-check before pushing
- Supabase `anon` keys are safe to use client-side — they are public by design
- Row Level Security (RLS) is enabled on all Supabase tables for protection

Thank you for helping keep FlixBase secure! 🔐
