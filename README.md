# Pure Invoices

Pure Invoices is designed to simplify your billing process. Simple, direct, and effective – invoicing done right. Learn more at [pureinvoices.com](https://pureinvoices.com).

## Developer Information

### Husky Pre-Commit Hooks

We have Husky set up to enforce pre-commit checks. These checks ensure that code is properly formatted and linted before being committed.

- **Linting and Formatting**: We use ESLint for linting and Prettier for code formatting. These tools help maintain code quality and consistency across the project.
- **Lint-Staged**: This tool runs linters on only staged files, ensuring quick feedback and preventing bad code from being committed.

### Lint and Prettier

We use ESLint and Prettier to enforce code quality and style guidelines.

- **ESLint**: Ensures code quality by catching syntax errors and enforcing best practices.
- **Prettier**: Formats code consistently to improve readability.

### Commitlint

We use [Commitlint](https://commitlint.js.org/) to enforce conventional commit messages. This ensures that our commit history is readable and that semantic versioning can be applied.

## Getting Started

### Prerequisites

- Node.js v16+

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pureinvoices/web.git
   ```

2. Navigate to the project directory:

   ```bash
   cd web
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## MVP Features

**1. User Authentication**

- Sign up with email and password
- Sign in with email and password
- Password reset functionality

**2. User Profile Management**

- View and edit user profile
- Change password

**3. Invoice Management**

- Create new invoices
- Edit existing invoices
- Delete invoices
- View list of all invoices
- Filter and search invoices

**4. Client Management**

- Add new clients
- Edit client information
- Delete clients
- View list of all clients
- Filter and search clients

**5. Invoice Details**

- Add and edit line items
- Calculate totals, taxes, and discounts
- Set due dates and payment terms

**6. Invoice Templates**

- Choose from predefined invoice templates

**7. Export and Share Invoices**

- Export invoices as PDF
- Share invoices via email

**8. Payment Integration**

- Integrate with one payment gateway (PayPal or Stripe)
- Track payment status (paid, unpaid, overdue)

**9. Notifications**

- Email notifications for invoice creation and updates

**10. Settings and Preferences**

- Manage account settings
- Configure invoice settings (currency, tax rates, etc.)
