# Security Guide: Protecting Your API Keys

## What Happened

You accidentally exposed your Google Maps API key in your code, which caused GitHub to ban your account. This is a common but serious security issue.

## ✅ What We Fixed

### 1. Created `.gitignore` File

- Added `.env` and other sensitive files to `.gitignore`
- Prevents accidental upload of sensitive files

### 2. Moved API Key to Environment Variables

- Created `.env` file to store your API key securely
- Updated all Python scripts to use `os.getenv()` instead of hardcoded keys
- Added `python-dotenv` dependency

### 3. Updated All Scripts

- `finalproject` (Manhattan)
- `finalproject_la.py` (Los Angeles)
- `finalproject_tokyo.py` (Tokyo)
- `finalproject_shanghai.py` (Shanghai)

## 🔒 Best Practices Going Forward

### 1. Never Hardcode Secrets

```python
# ❌ WRONG - Never do this
API_KEY = 'your-actual-api-key-here'

# ✅ CORRECT - Use environment variables
import os
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv('GOOGLE_MAPS_API_KEY')
```

### 2. Always Use `.gitignore`

```gitignore
# Environment files
.env
.env.local
.env.development
.env.test
.env.production

# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
venv/
env/
```

### 3. Create Environment Files

```bash
# Create .env file (this will be ignored by git)
echo "GOOGLE_MAPS_API_KEY=your-actual-key-here" > .env
```

### 4. Document Setup Process

- Create README files explaining how to set up environment variables
- Include instructions for getting API keys
- List all dependencies

## 🚨 If You Accidentally Expose an API Key

### Immediate Steps:

1. **Revoke the exposed key immediately** in Google Cloud Console
2. **Generate a new API key**
3. **Update your `.env` file** with the new key
4. **Remove the key from git history** if it was committed:
   ```bash
   git filter-branch --force --index-filter \
   'git rm --cached --ignore-unmatch path/to/file/with/key' \
   --prune-empty --tag-name-filter cat -- --all
   ```

### For GitHub Bans:

1. **Contact GitHub Support** explaining the situation
2. **Show them you've fixed the issue** (removed hardcoded keys)
3. **Provide evidence** of the security improvements
4. **Request account restoration**

## 📋 Checklist for New Projects

- [ ] Create `.gitignore` before writing any code
- [ ] Set up environment variables from the start
- [ ] Never commit API keys, passwords, or tokens
- [ ] Use `.env` files for local development
- [ ] Document setup process in README
- [ ] Test that sensitive files are actually ignored
- [ ] Use different keys for development vs production

## 🔧 Testing Your Setup

### Verify `.gitignore` is Working:

```bash
# This should show .env as untracked
git status

# This should NOT show your .env file
git add .
git status
```

### Test Environment Variables:

```bash
# Run your script to make sure it works
python finalproject
```

## 📚 Additional Resources

- [GitHub Security Best Practices](https://docs.github.com/en/code-security/security-advisories/security-advisories)
- [Google Cloud API Key Security](https://cloud.google.com/docs/authentication/api-keys)
- [Python Environment Variables](https://docs.python.org/3/library/os.html#os.getenv)

## 🆘 Emergency Contacts

If you need help with:

- **GitHub account issues**: Contact GitHub Support
- **Google Cloud API issues**: Contact Google Cloud Support
- **Security concerns**: Consider using a password manager for API keys

---

**Remember**: It's better to spend 5 minutes setting up security properly than hours fixing a security breach!
