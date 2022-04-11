# README

## 1. Setup

---

### 1.1. Initialize Project

---

```bash
npm init vite@latest taskbox-ts -- --template react-ts
cd taskbox-ts
npm uninstall
```

### 1.2. Development Dependencies

---

#### 1.2.1. Prettier

---

```bash
npm install -D prettier prettier-plugin-sh
```

#### 1.2.2. ESLint

---

```bash
npm install -D eslint eslint-config-prettier eslint-plugin-import @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-import-resolver-webpack
```

#### 1.2.3. Husky

---

```bash
npm install -D husky
npx husky install
```

#### 1.2.4. lint-staged

---

```bash
npm install -D lint-staged
```

#### 1.2.5. ts-node

---

```bash
npm install -D ts-node
```

#### 1.2.6. Jest

---

```bash
npm install -D jest eslint-plugin-jest
```

#### 1.2.7. Babel

---

```bash
npm install -D babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

#### 1.2.8. React Testing Library

---

```bash
npm install -D @testing-library/react@12 @testing-library/jest-dom @testing-library/user-event eslint-plugin-jest-dom
```

#### 1.2.9. Mock Service Worker

---

```bash
npm install -D msw@^0.36.0
```

#### 1.2.10. Storybook

---

```bash
npx sb init --builder storybook-builder-vite
npm install -D eslint-plugin-storybook @storybook/testing-react msw-storybook-addon
```

### 1.3. Dependencies

---

#### 1.3.1. Redux Toolkit

---

```bash
npm install @reduxjs/toolkit react-redux
```
