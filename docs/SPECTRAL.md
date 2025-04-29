# Spectral API Linting

This document explains how to use Spectral with pre-commit hooks for API contract linting.

## Prerequisites

1. Python 3.x installed
2. Node.js and npm installed
3. Spectral CLI: `npm install -g @stoplight/spectral-cli`

## Setup

### 1. Python Virtual Environment

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Linux/Mac
# or
.\venv\Scripts\activate   # On Windows
```

### 2. Install Pre-commit

```bash
pip install --upgrade pip
pip install pre-commit
```

### 3. Configure Pre-commit

Create `.pre-commit-config.yaml` in your project root:

```yaml
repos:
  - repo: local
    hooks:
      - id: check-headers
        name: "Check security headers"
        entry: security-checks/scripts/check-headers.sh http://127.0.0.1/api/v1
        language: script
        pass_filenames: false

      - id: spectral-headers
        name: "Spectral lint security headers"
        entry: spectral lint --ruleset security-checks/config/spectral.yaml tmp/headers.json --fail-severity=error --verbose
        language: node
        always_run: true
        pass_filenames: false

      - id: security-checklist
        name: "Security checklist validation"
        entry: spectral lint --ruleset security-checks/config/checklist.yaml --verbose security-checks/checklist.yaml
        language: node
        pass_filenames: false
        always_run: true
```

### 4. Initialize Pre-commit

```bash
# Install the git hook scripts
pre-commit install

# (Optional) Update to the latest versions
pre-commit autoupdate

# Test the setup
pre-commit clean
pre-commit run --all-files
```

## Usage

Pre-commit will automatically run on `git commit`. To manually check files:

```bash
# Check all files
pre-commit run --all-files

# Check specific files
pre-commit run --files path/to/file.yaml

# Run specific hook
pre-commit run spectral-lint --all-files
```

## Troubleshooting

- **Hook failed**: Run with verbose flag `pre-commit run -v`
- **Cache issues**: Clear cache with `pre-commit clean`
- **Update hooks**: Run `pre-commit autoupdate`
