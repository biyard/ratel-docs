---
title: Decentralized Identity (DID)
description: Understanding and using DID on Ratel
sidebar_position: 1
---

# Decentralized Identity (DID)

Learn about decentralized identity and how to use it on Ratel.

:::info Beta Feature
DID functionality is currently in beta as part of the **Oracle verification system** (Q1 2025). Full DID implementation planned for Q2 2025.
:::

## What is DID?

**Decentralized Identity (DID)** is a new type of identifier that enables verifiable, self-sovereign digital identity. Unlike traditional identities controlled by centralized authorities, DIDs give you full ownership and control of your identity credentials.

### Key Principles

**Self-Sovereign**
- You own your identity
- No central authority controls it
- You decide what to share

**Verifiable**
- Claims can be cryptographically verified
- Community-based attestation
- Trustless verification

**Portable**
- Use across platforms
- Not locked to Ratel
- Interoperable standards

## How Ratel Uses DID

### Oracle-Based Verification

Ratel's DID system uses the **Oracle** - a multi-party verification mechanism where community members vote to verify identity attributes.

**Process:**
1. You submit a verification request
2. Provide evidence for your claim
3. Oracle voters review evidence
4. Community votes approve/reject
5. Verified attributes added to your DID

### Expandable Attributes

Unlike traditional KYC limited to governmental verification, Ratel's Oracle enables verification of diverse attributes:

#### Governmental Attributes
- Age verification (18+, 21+)
- Country of residence
- Government-issued ID verification
- Professional licenses

#### Professional Credentials
- Industry expertise
- Skills and certifications
- Work experience
- Educational background
- Portfolio verification

#### Reputation Metrics
- Community standing
- Contribution history
- Expertise domains
- Trust score

#### Social Proof
- Organization memberships
- Event attendance
- Community affiliations
- Achievement badges

#### Custom Attributes
- Any attribute valued by the community
- Domain-specific credentials
- Special recognitions
- Role-based attributes

## Setting Up Your DID

### Step 1: Create DID Document

1. Go to Settings → **Identity**
2. Click "Create DID"
3. Your DID is generated:
   ```
   did:ratel:user_abc123
   ```

### Step 2: Add Basic Profile

Your DID document includes:

```json
{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:ratel:user_abc123",
  "authentication": [{
    "id": "did:ratel:user_abc123#key-1",
    "type": "Ed25519VerificationKey2020",
    "controller": "did:ratel:user_abc123",
    "publicKeyMultibase": "z6Mk..."
  }],
  "service": [{
    "id": "did:ratel:user_abc123#profile",
    "type": "Profile",
    "serviceEndpoint": "https://ratel.foundation/users/alice"
  }]
}
```

### Step 3: Request Verifications

Submit verification requests for attributes:

1. Settings → **Identity** → **Verifications**
2. Click "Request Verification"
3. Choose attribute type
4. Provide evidence
5. Submit to Oracle

## Verification Types

### 1. Email Verification

**Evidence Required:**
- Verified email address

**Process:**
- Automatic verification
- No voting required
- Instant approval

**Benefits:**
- Password recovery
- Notification preferences
- Basic trust signal

### 2. Government ID (KYC)

:::caution Coming Soon
Government ID verification planned for Q2 2025 via third-party KYC providers.
:::

**Evidence Required:**
- Government-issued ID photo
- Selfie for liveness check
- Proof of address (optional)

**Process:**
- Third-party KYC verification
- Privacy-preserving (zero-knowledge proof)
- Only yes/no result stored on-chain

**Benefits:**
- Access age-restricted Spaces
- Higher reputation score
- Compliance for regulated activities

### 3. Professional Skills

**Evidence Required:**
- Portfolio links (GitHub, Behance, etc.)
- Certifications
- Work history
- Projects

**Process:**
- Community Oracle voting
- Experts in field review evidence
- 7-day voting period
- 67% approval threshold

**Example:**

```markdown
**Attribute:** Rust Developer
**Evidence:**
- GitHub: github.com/alice (20+ Rust projects)
- Crates.io: 5 published crates
- Contributions: Tokio, Actix-web
- Certification: Rust Programming Certification
```

### 4. Community Reputation

**Evidence Required:**
- Contribution history
- Community feedback
- Quality metrics

**Process:**
- Automatic calculation
- Based on platform activity
- Updated monthly

**Metrics:**
- Post quality score
- Helpful comment rate
- Deliberation participation
- Moderation record

### 5. Organization Membership

**Evidence Required:**
- Official membership proof
- Organization endorsement
- Public records

**Process:**
- Organization admin verification
- Or community Oracle vote
- Renewable annually

**Examples:**
- Company employee
- DAO member
- Non-profit volunteer
- Academic institution

## Using Your DID

### On Ratel

**Profile Display**
- Verified badge on profile
- Attribute badges displayed
- Trust score visible

**Access Control**
- Join verified-only Spaces
- Participate in gated deliberations
- Access premium features

**Reputation**
- Higher initial trust
- Better content visibility
- Moderation privileges

### Cross-Platform

**Export Your DID**

1. Settings → **Identity** → **Export**
2. Download DID document
3. Use on other platforms

**Compatible Platforms:**
- Other DID-enabled dApps
- Web3 applications
- Decentralized social networks

### Verifiable Credentials

Request signed credentials:

```json
{
  "@context": "https://www.w3.org/2018/credentials/v1",
  "type": ["VerifiableCredential", "SkillCredential"],
  "issuer": "did:ratel:oracle",
  "issuanceDate": "2025-03-20T10:00:00Z",
  "credentialSubject": {
    "id": "did:ratel:user_abc123",
    "skill": "Rust Developer",
    "evidenceUrl": "https://ratel.foundation/oracle/verification_xyz789"
  },
  "proof": {
    "type": "Ed25519Signature2020",
    "created": "2025-03-20T10:00:00Z",
    "verificationMethod": "did:ratel:oracle#key-1",
    "proofPurpose": "assertionMethod",
    "proofValue": "z5s..."
  }
}
```

## Privacy and Security

### Privacy Controls

**Choose What to Share**
- Control visibility per attribute
- Public, connections-only, or private
- Selective disclosure

**Zero-Knowledge Proofs**
- Prove age without revealing birthdate
- Prove location without exact address
- Prove credential without details

### Security Features

**Key Management**
- Self-custody of private keys
- Hardware wallet support
- Social recovery options

**Revocation**
- Revoke credentials anytime
- Update outdated attributes
- Remove compromised verifications

**Audit Trail**
- View all verification history
- Track who verified what
- Transparent voting records

## Oracle Voting

### Becoming a Verifier

Requirements:
- RATEL token holder (min 100 tokens)
- Account age >30 days
- Good reputation score
- Relevant expertise (for some attributes)

### Voting Process

1. Review verification requests in your expertise
2. Examine evidence carefully
3. Vote approve/reject with justification
4. Earn rewards for accurate votes

### Voting Rewards

- **Accurate votes**: Earn RATEL tokens
- **Inaccurate votes**: Lose reputation
- **Malicious votes**: Token slashing

## Best Practices

### For Users

✅ **Do:**
- Provide comprehensive evidence
- Be honest in claims
- Keep credentials updated
- Use multiple verification types
- Respect privacy settings

❌ **Don't:**
- Submit false claims
- Share private keys
- Over-share personal info
- Rely solely on one credential
- Ignore revocation needs

### For Verifiers

✅ **Do:**
- Review evidence thoroughly
- Vote within your expertise
- Provide constructive feedback
- Be impartial and fair
- Report suspicious requests

❌ **Don't:**
- Vote without reviewing
- Rubber-stamp approvals
- Vote based on personal bias
- Share voting reasons publicly
- Accept bribes for votes

## FAQs

**Q: Is DID required to use Ratel?**
No, DID is completely optional. It enhances your experience but isn't required.

**Q: What data is stored on-chain?**
Only verification results (yes/no) and hashes. No personal data is stored on-chain.

**Q: Can I delete my DID?**
Yes, you can revoke your DID anytime. This doesn't delete on-chain history but marks it as revoked.

**Q: How long do verifications last?**
- Email: Until email changes
- Government ID: 2 years
- Skills: 1 year (renewable)
- Reputation: Updated monthly
- Organization: Until membership ends

**Q: What if my verification request is rejected?**
You can resubmit with better evidence or appeal to a different Oracle pool.

**Q: How much does verification cost?**
- Email: Free
- Government ID: ~$5 (covers KYC provider costs)
- Oracle verifications: Small RATEL token fee (to prevent spam)

## Resources

- **DID Specification**: [W3C DID Core](https://www.w3.org/TR/did-core/)
- **Oracle Documentation**: [Oracle System](/governance/oracle/intro)
- **Support**: hi@biyard.co

---

*See also: [Oracle Verification](/governance/oracle/intro) • [Privacy Policy](/security/privacy-policy) • [Profile Settings](/guide/account/profile-settings)*
