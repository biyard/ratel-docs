---
title: Telegram Bot
description: Connect Ratel to Telegram
sidebar_position: 3
---

# Telegram Bot

Integrate Ratel with Telegram for notifications and updates.

:::info Coming Soon
Telegram Bot integration is planned for **Q3 2025**. This documentation describes the planned functionality.
:::

## What is the Ratel Telegram Bot?

The Ratel Telegram Bot brings platform features directly to Telegram, allowing you to:

- Receive real-time notifications
- View and create posts
- Participate in deliberations
- Get Space updates
- Manage your account
- Interact with the community

## Features

### Notifications

Receive instant alerts for:
- New posts in your Spaces
- Mentions and replies
- Direct messages
- Deliberation updates
- Oracle voting requests
- Token rewards
- Moderation actions

### Content Management

**View Content**
- Browse recent posts
- Read threads
- View Space activity
- Check deliberation results

**Create Content**
- Post text updates
- Share images
- Create polls
- Reply to discussions

### Deliberation Participation

**Survey Responses**
- Receive survey notifications
- Submit answers via bot
- View voting results
- Get deliberation summaries

**Discussion**
- Join deliberation discussions
- Share opinions
- React to posts
- Track consensus

### Space Management

**Member Management**
- Approve join requests
- Manage permissions
- View member list
- Send announcements

**Moderation**
- Review flagged content
- Take moderation actions
- Manage reports
- Ban/mute users

### Oracle Voting

**Verification Alerts**
- New verification requests in your expertise
- Voting reminders
- Results notifications
- Reward updates

**Quick Voting**
- Review evidence
- Cast votes
- Add comments
- Track your voting history

## Connecting Telegram

### Step 1: Find the Bot

Search for `@RatelBot` in Telegram or click:
```
https://t.me/RatelBot
```

### Step 2: Start the Bot

Send `/start` to begin:

```
👋 Welcome to Ratel Bot!

Connect your Ratel account to receive notifications
and manage your Spaces directly from Telegram.

Type /connect to link your account.
```

### Step 3: Link Your Account

1. Send `/connect`
2. Click the verification link
3. Log in to Ratel
4. Authorize Telegram access
5. Receive confirmation code
6. Enter code in Telegram

```
🎉 Successfully connected!

You can now:
- /settings - Configure notifications
- /spaces - View your Spaces
- /help - See all commands
```

## Bot Commands

### Account Commands

**`/connect`**
- Link your Ratel account

**`/disconnect`**
- Unlink Telegram

**`/profile`**
- View your profile stats

**`/settings`**
- Configure notification preferences

### Content Commands

**`/recent`**
- View recent posts from your Spaces

**`/post [message]`**
- Create a new post

**`/spaces`**
- List your Spaces

**`/space [name]`**
- View Space details and recent activity

**`/mentions`**
- See your recent mentions

### Deliberation Commands

**`/deliberations`**
- Active deliberations in your Spaces

**`/vote [id]`**
- Participate in deliberation

**`/results [id]`**
- View deliberation results

### Oracle Commands

**`/verify`**
- Check pending verification requests

**`/cast [id] [approve/reject]`**
- Vote on verification

**`/attestations`**
- View your verified attributes

### Moderation Commands

**`/reports`**
- View pending reports

**`/moderate [action] [id]`**
- Take moderation action

**`/ban [username] [reason]`**
- Ban user from Space

**`/mute [username] [duration]`**
- Temporarily mute user

### Utility Commands

**`/help`**
- Show all available commands

**`/search [query]`**
- Search posts and Spaces

**`/stats`**
- View your activity statistics

**`/notifications`**
- Check notification status

## Notification Settings

### Customizing Notifications

Configure what notifications you receive:

```
/settings

⚙️ Notification Settings

Posts & Comments:
🔔 New posts in Spaces: ON
🔔 Replies to your posts: ON
🔔 Mentions: ON
🔔 Post likes: OFF

Deliberations:
🔔 New deliberations: ON
🔔 Voting reminders: ON
🔔 Results: ON

Oracle:
🔔 Verification requests: ON
🔔 Vote outcomes: ON
🔔 Rewards: ON

Messages:
🔔 Direct messages: ON
🔔 Group invites: ON

Tap a setting to toggle
```

### Quiet Hours

Set times when notifications are paused:

```
/quiethours

🌙 Quiet Hours

Start: 23:00
End: 08:00
Timezone: America/New_York
Emergency alerts: ON

Notifications will be queued during quiet hours
and delivered when quiet hours end.
```

### Priority Notifications

Important notifications override quiet hours:
- Emergency Space announcements
- Security alerts
- Critical moderation issues
- Time-sensitive voting deadlines

## Using the Bot

### Creating a Post

**Text Post:**
```
/post Just joined the Crypto Policy Space!
Excited to participate in the discussions. 🚀
```

**Image Post:**
1. Send image to bot
2. Add caption with `/post` command
3. Select target Space

**Poll:**
```
/poll

📊 Create a Poll

Question: What should we discuss next?
Option 1: DeFi regulation
Option 2: NFT standards
Option 3: DAO governance
Option 4: Privacy tech

Duration: 7 days
Space: Crypto Policy

Send to confirm
```

### Participating in Deliberation

```
/deliberations

📋 Active Deliberations

1. Should we implement quadratic voting?
   Space: Crypto Policy
   Phase: Discussion (3 days left)
   Participants: 142

2. NFT royalty standards
   Space: Digital Art
   Phase: Post-survey (1 day left)
   Participants: 89

Type /vote [number] to participate
```

```
/vote 1

🗳️ Deliberation: Quadratic voting implementation

Pre-survey results:
Support: 67%
Oppose: 21%
Unsure: 12%

Current phase: Discussion
Your posts: View latest arguments

Actions:
💬 Post comment
📊 View stats
🔔 Get updates

What would you like to do?
```

### Oracle Voting

```
/verify

⚖️ Pending Verifications (3)

1. Rust Developer - @alice
   Evidence: ⭐⭐⭐⭐ (Strong)
   Deadline: 2 days

2. DAO Contributor - @bob
   Evidence: ⭐⭐⭐ (Good)
   Deadline: 4 days

3. NFT Artist - @carol
   Evidence: ⭐⭐⭐⭐⭐ (Excellent)
   Deadline: 1 day

Type /cast [number] to review and vote
```

```
/cast 1

👨‍💻 Verification Review

User: @alice
Attribute: Rust Developer
Submitted: 2025-03-15

Evidence:
• GitHub: 25+ Rust projects
• Crates.io: 3 published crates
• Contributions: Tokio, Actix
• Cert: Rust Programming

Your vote:
✅ Approve
❌ Reject

Add optional comment (or skip):
```

## Space Integration

### Space-Specific Bots

Create dedicated bots for your Spaces:

1. Settings → **Integrations** → **Telegram**
2. Click "Create Space Bot"
3. Configure permissions
4. Invite bot to Telegram group
5. Bot manages Space updates

### Telegram Group Sync

Sync your Telegram group with a Space:

**Features:**
- Two-way message sync
- Member role mapping
- Moderation sync
- Announcement mirroring

**Setup:**
1. Create Telegram group
2. Add @RatelBot as admin
3. `/sync` command
4. Select Ratel Space
5. Configure sync rules

### Automated Announcements

Schedule announcements to Telegram:

```
/announce

📢 Schedule Announcement

Message: Community call tomorrow at 2 PM UTC!
Space: Crypto Policy
Telegram groups: All
Schedule: 2025-03-21 10:00 UTC

Confirm to schedule
```

## Privacy and Security

### Data Privacy

The bot:
- Uses end-to-end encryption for DMs
- Stores minimal data (Telegram ID + Ratel user ID)
- Doesn't access Telegram messages not sent to bot
- Complies with Telegram's privacy policy

### Security Features

**Two-Factor Commands**
- Sensitive actions require confirmation
- Ban/mute actions require reason
- Verification votes can be reconsidered

**Rate Limiting**
- Prevent spam
- 10 posts/hour
- 50 commands/hour

**Audit Log**
- Track all bot actions
- Review command history
- Export logs

### Disconnecting

To unlink your account:

```
/disconnect

⚠️ Disconnect Telegram

This will:
- Stop all notifications
- Remove Telegram integration
- Revoke bot access
- Preserve your Ratel account

Type CONFIRM to proceed
```

## Troubleshooting

**Bot not responding?**
- Check if bot is blocked
- Try `/start` again
- Reconnect account with `/connect`

**Notifications not working?**
- Check `/settings`
- Verify quiet hours
- Ensure Space notifications enabled

**Can't post?**
- Verify account connected
- Check Space permissions
- Review rate limits

**Commands not working?**
- Update bot (send `/start`)
- Check command syntax
- Contact support

## Support

- **Command help**: `/help` in bot
- **Email**: hi@biyard.co
- **Community**: Join #telegram-support in Discord

---

*See also: [Notifications](/guide/account/notifications) • [Space Management](/spaces/managing-spaces) • [Privacy Policy](/security/privacy-policy)*
