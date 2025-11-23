---
title: Team Permissions
description: Roles and access control
sidebar_position: 3
---

# Team Permissions

Understand team roles and permission management.

![Permissions Overview](/img/screenshots/teams/permissions-overview.png)
*Complete overview of team roles and their permissions*

## Team Roles

### Owner
**Full Control** - One per team

![Role Assignment](/img/screenshots/teams/role-assignment.png)
*Assign roles to team members*

Permissions:
- All administrative access
- Delete team
- Transfer ownership
- Manage all settings
- Add/remove anyone
- Configure billing (future)

### Administrator
**Management** - Unlimited admins

Permissions:
- Add/remove members
- Manage settings
- Create team spaces
- Moderate content
- Cannot delete team
- Cannot remove owner

### Moderator
**Content Management** - Support role

Permissions:
- Moderate team spaces
- Remove inappropriate content
- Warning system access
- Basic member management
- No settings access
- Cannot remove admins

### Member
**Standard Access** - Default role

Permissions:
- View team content
- Post in team spaces
- Participate in discussions
- See member list
- No management access

### Guest
**Limited Access** - Temporary

Permissions:
- View public team content
- Limited posting
- Cannot see all members
- No space creation
- Time-limited access (optional)

## Permission Matrix

![Permission Matrix](/img/screenshots/teams/permission-matrix.png)
*Detailed permission breakdown by role*

| Permission | Owner | Admin | Moderator | Member | Guest |
|---|---|---|---|---|---|
| Delete Team | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Settings | ✅ | ✅ | ❌ | ❌ | ❌ |
| Add Members | ✅ | ✅ | ❌ | ❌ | ❌ |
| Remove Members | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Create Spaces | ✅ | ✅ | ❌ | ❌ | ❌ |
| Moderate Content | ✅ | ✅ | ✅ | ❌ | ❌ |
| Post Content | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| View Content | ✅ | ✅ | ✅ | ✅ | ⚠️ |

⚠️ = Limited access

## Managing Permissions

### Assigning Roles
1. Team Settings → **Members**
2. Find member
3. Click role dropdown
4. Select new role
5. Confirm change

### Custom Permissions
Coming soon:
- Create custom roles
- Granular permissions
- Role templates
- Temporary permissions

## Permission Best Practices

### Role Assignment
✅ Minimum necessary permissions
✅ Clear role definitions
✅ Regular permission audits
✅ Document special cases

### Security
✅ Limit owner/admin count
✅ Review access regularly
✅ Remove ex-members promptly
✅ Monitor permission changes

### Organization
✅ Consistent role naming
✅ Clear expectations
✅ Training for admins
✅ Escalation procedures

## Special Permissions

### Space Permissions
- Override team permissions
- Space-specific roles
- Inherited from team
- Can be more restrictive

### Content Permissions
- Delete own content
- Edit own content
- Moderate team content
- Pin important posts

## Transferring Ownership

Current owner can transfer to another member:
1. Team Settings → **Ownership**
2. Select new owner
3. Confirm transfer
4. New owner accepts
5. You become admin

**Note**: This action cannot be undone easily!

## Permission Changes

Logged and visible to:
- Team owners
- Administrators
- Affected users

Includes:
- Who made change
- What was changed
- When it happened
- Reason (if provided)

---

*Related: [Team Management](./team-management) • [Creating Teams](./creating-teams)*
