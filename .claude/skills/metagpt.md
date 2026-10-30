# MetaGPT Skill Guide

This skill provides instructions on how to use and run **MetaGPT**, the multi-agent framework located on your desktop at `C:\Users\Victory\Desktop\MetaGPT`.

## Overview
MetaGPT takes a natural language requirement and assigns different roles (Product Managers, Architects, Project Managers, Engineers) to collaborate as an automated software company.

## Quick Start & Installation
1. Navigate to the MetaGPT directory:
   ```bash
   cd "C:\Users\Victory\Desktop\MetaGPT"
   ```
2. Activate your virtual environment and install dependencies:
   ```bash
   pip install -e .
   ```
3. Configure your API key (e.g. OpenAI or compatible LLM provider) in `~/.metagpt/config2.yaml` or `config/config2.yaml`.

## Common Commands
- **Start a new project:**
  ```bash
  metagpt "Write a cli snake game"
  ```
- **Run without implementing code:**
  ```bash
  metagpt "Write a cli snake game" --no-implement
  ```
- **Enable code review & testing:**
  ```bash
  metagpt "Write a cli snake game" --code-review --run-tests
  ```
- **Specify project path & incremental mode:**
  ```bash
  metagpt "Add dark mode" --inc --project-path "workspace/snake_game"
  ```

## Key Options
- `--investment FLOAT`: Dollar amount to invest in the AI company (default: 3.0)
- `--n-round INTEGER`: Number of simulation rounds (default: 5)
- `--code-review / --no-code-review`: Enable or disable code review
- `--run-tests / --no-run-tests`: Enable QA unit testing
- `--implement / --no-implement`: Enable or disable code implementation
