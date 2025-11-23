---
title: Data Protection
description: How we protect your data
sidebar_position: 3
---

# Data Protection

Ratel is committed to protecting your personal data through robust technical and organizational measures.

## Data Classification

We classify data into categories with appropriate protection levels:

- **Public Data**: Publicly visible profile information
- **Personal Data**: Email, authentication credentials  
- **Sensitive Data**: Financial information, private keys
- **Usage Data**: Analytics and behavioral data

## Encryption

### At Rest
- AES-256-GCM encryption for all stored data
- AWS Key Management Service (KMS) for key management
- Client-side encryption for private keys

### In Transit
- TLS 1.3 for all network communications
- Certificate pinning for mobile apps
- Secure WebSocket connections

## Access Controls

- **Authentication**: Multi-factor authentication (MFA) support
- **Authorization**: Role-based access control (RBAC)
- **Session Management**: Secure tokens with automatic expiration
- **API Keys**: Encrypted storage with rotation policies

## Data Retention

- **Active Accounts**: Data retained while account is active
- **Deleted Accounts**: 30-day grace period, then permanent deletion
- **Backups**: Retained for 90 days with encryption
- **Legal Holds**: Extended retention when required by law

## User Privacy Controls

You can:
- Export your data in portable format
- Delete your account and all associated data
- Control visibility of your profile information
- Manage third-party data sharing preferences

## Data Breach Response

In the unlikely event of a data breach:

1. Immediate containment and investigation
2. User notification within 72 hours
3. Regulatory notification as required
4. Transparent public disclosure
5. Remediation and prevention measures

## Compliance

- **GDPR**: EU General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act
- **PIPEDA**: Canadian privacy law compliance

## Contact

Data protection inquiries: [privacy@biyard.co](mailto:privacy@biyard.co)

© 2025 Biyard Corp.. All rights reserved.
