# Article notes: Stop Running AI Agents on Your Laptop

## Direction and voice

A personal, opinionated argument for running coding agents on an always-on home server.
Lead with a hot take, then support it with the author's experience. Give readers enough
technical detail to understand and try the setup. Make it useful, personal, and fun to
read, with a position worth discussing.

Be direct. Make recommendations. Swearing is welcome where frustration makes it natural.
Avoid forced profanity, a neutral buying guide, and repetitive disclaimers. Keep factual
claims precise so the opinion has something solid behind it.

Treat other developers with respect. The humor comes from the awkward setup and the
constraints people work around. The backpack story should make that problem recognizable
without portraying colleagues as foolish. Balance the opinion with practical explanation.

Make the benefit relevant to people working from home too. Commuting is one illustration;
the broader point is that agents can work independently of the laptop and its user.

Central argument:

> Your AI agents shouldn't need your laptop to stay awake. Put them on a server and let
> them keep working when you close it.

Remote development has existed for years. Agents make persistence much more useful: work
can continue between human interactions. Research, implementation, and resource collection
can progress while the author is commuting or asleep.

The central benefit is convenience. The author can close the laptop, lose its Wi-Fi
connection, or let its battery run out without interrupting the agent on the server. An
agent can finish and sit idle, or wait for input until the author returns. Both are
normal. Avoid framing this as working 24/7, maximizing token consumption or subscription
usage, or making sure agents are busy every moment. Do not add a monitoring or
notification workflow to keep them constantly occupied.

Establish the audience early: developers comfortable working in a terminal. The author
already used Neovim confidently before coding agent harnesses existed. Preserve the
opinion that terminal user interfaces (TUIs) are better suited to coding agents than
graphical interfaces (GUIs), and that the author prefers TUIs generally. State this as a
personal position. Readers who want a graphical agent or editor workflow are outside the
scope of this setup; respect that preference without diluting the recommendation.

The author will add one real task and its outcome later. Leave that example pending and
continue drafting around the supplied workflows; do not invent a result or ask for it now.

## Title and search presentation

Recommended title: **Stop Running AI Agents on Your Laptop**

Recommended slug: `ai-agents-home-server`

Other candidates:

| Title                                                         | Slug                             | Angle                                                          |
| ------------------------------------------------------------- | -------------------------------- | -------------------------------------------------------------- |
| Your Laptop Is a Terrible Home for AI Agents                  | `ai-agents-on-a-server`          | Stronger provocation, immediately clear topic                  |
| Close Your Laptop. Your AI Agents Should Keep Working.        | `keep-ai-agents-running`         | Concrete benefit                                               |
| Your AI Agents Don't Need a Mac Mini                          | `ai-agents-home-server-hardware` | Hardware argument; use only if hardware becomes the main story |
| Stop Babysitting Your Laptop. Put Your AI Agents on a Server. | `run-ai-agents-home-server`      | Frustration plus solution; longer title                        |

Working description:

> I run Codex and Claude Code on a home server. Close the laptop, check in from my phone,
> and come back to work ready for review. Here's my setup.

Use Codex, Claude Code, home server, SSH, and Tailscale naturally in the introduction and
relevant sections. Avoid stuffing every tool name into the title. No keyword volume
research has been done; these are editorial choices, not ranking predictions. Google
recommends descriptive, concise titles that accurately reflect the page:
[title guidance](https://developers.google.com/search/docs/appearance/title-link).

## 1. Open with the opinion, then the backpack story

Possible opening, to refine in the article:

> Your laptop is a terrible place for an AI agent to live.
>
> A couple of guys at the office told me how they keep their agents running on the way
> home. They have something set up to keep their MacBooks awake with the lid closed.
> Before leaving, they connect to a hotspot, put the laptop in a backpack, and hope the
> connection holds for the journey.
>
> I get it. I've also wanted to leave while an agent was still working. But keeping a
> computer awake in a backpack and hoping for mobile coverage is a lot of effort just to
> let a task continue.
>
> I moved my agents to a home server. Now I can close the laptop whenever I want. And when
> I have an idea before bed, I can give the agent a task from my phone and review what it
> did the next morning.

This is a story colleagues told the author. Preserve that attribution. Do not invent which
keep-awake tool they use, claim their connection actually failed, or imply a lost
connection necessarily destroys the work. No names or ridicule are needed.

Keep the story short and transition to the benefit at home immediately. The author has
also repeatedly wanted to leave while an agent was working, but the article should not
depend on a commute. There is no need to invent a particular feature, evening, or measured
time saving.

Small tasks can be interrupted, but returning still means refocusing and checking where
things stopped. Broader research can take much longer: comparing features, reading
standards, collecting resources, or investigating competitors and possible improvements.
Interrupting that work delays the result and creates another handoff. Do not claim all
completed work or conversation context disappears on interruption.

For roughly a month or two, the author has run Codex and Claude Code almost exclusively on
a home server. The laptop can sleep while the server keeps the agent running.

## 2. Why this matters much more with agents

Previously, the author personally wrote code, researched questions, and collected
resources. The work depended on being at the keyboard, so moving development to a remote
machine did not offer enough benefit to bother. Agents changed that: assigned work can
continue between check-ins, independently of the laptop.

Use the author's examples as typical workflows, not fabricated case studies:

- Have an idea before bed, pick up the phone, and ask an agent to work on it. Return the
  next morning to review and test the result. Readiness for review is the expectation; do
  not promise every overnight task will be finished or correct.
- Leave a longer research task running. If the agent needs input, reconnect to the same
  herdr session from the phone, answer, and let it continue.
- Leave a feature task running and ask the agent to open a draft PR. Review it from the
  phone on the way home and merge it when satisfied. Start the next morning on a different
  problem instead of reconstructing yesterday's stopping point.

- Walk to a meeting room while an agent is working. Close the lid and carry the laptop
  normally, without keeping it slightly open to prevent sleep.

Give the bedtime and research examples at least as much space as the commute. The reader
should recognize the benefit even if they work from home every day.

The phone is useful for short prompts, status checks, answering questions, and manageable
reviews through GitHub's interface. Reviewing on the phone is less convenient than on a
computer, but useful when away from the desk. An agent waiting for an answer can wait
until the author wants to reconnect.

Potential line:

> I want to wake up to something I can review.

## 3. What runs where

Explain the architecture once, with one ASCII diagram. The author will replace it with a
hand-drawn version later:

```text
Laptop / phone / other computer
              |
       SSH over Tailscale
              |
          Home server
     Ubuntu + herdr sessions
   repositories, tools, builds,
       tests, agent clients
              |
       Hosted AI providers
```

Codex and Claude Code run their clients and tools on the server. Hosted providers run the
models. Buying a development server does not require buying hardware for local model
inference.

Three pieces make the daily workflow work:

- **Ubuntu Server:** the development environment, repositories, and processes live here.
  Brief personal explanation: familiar, stable in the author's use, and easy to find
  documentation for.
- **Tailscale and SSH:** access the same server from the laptop or phone. Explain ordinary
  SSH over the private network. Tailscale SSH is a separate optional feature, not a
  requirement of this setup.
- **herdr:** terminal sessions stay running when the client disconnects. Reconnect to the
  same session. Use the correct name, herdr, throughout.

### Connect, develop, test, and review

Show the author's actual connection commands:

```bash
ssh homelab
hd
```

`homelab` is a short name configured in the author's SSH config. `hd` is an alias for
`herdr`. Explain both, and use `herdr` in setup instructions for readers who do not have
those aliases. An SSH alias does not automatically create a browser hostname.

In herdr, the author can see the state of agents working in different repositories, switch
between them, and work on several tasks in parallel. Reconnecting from the laptop or phone
returns to those same sessions.

For browser development, run the usual command in the repository on the server:

```bash
pnpm dev --host
```

In the author's projects, this starts the dev server on `0.0.0.0`, listening on all IPv4
interfaces. The exact flag depends on the project's dev server. Open
`http://<server-tailscale-ip>:<dev-port>` in the MacBook or phone browser, using the port
reported by the dev server. A resolvable Tailscale device name also works. The client must
be connected to Tailscale and allowed to reach that port.

The server is headless and has no browser. The author clicks through the feature and tests
it in a real browser on the MacBook or phone, without deploying it anywhere. The workflow
feels like ordinary laptop development: inspect the changes, run tests, try the feature in
the browser, and ask the agent for adjustments. When satisfied, ask it to commit, push,
and open a PR. Review through the usual tools or GitHub's interface.

### Private access

Lead with the practical security benefit: remote access without exposing SSH or dev
servers to the public internet. Suggested wording:

> Tailscale lets me reach SSH and my dev servers from wherever I am without exposing them
> to the public internet. I don't have to open public ports for either.

Documentation checked on 2026-09-18: Tailscale's
[Ubuntu server guide](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
supports using Tailscale to keep services off the public web. Keep the article focused on
that benefit. Editorial accuracy note: `0.0.0.0` can also permit home LAN access, so avoid
the broader claim that no device outside the tailnet can access anything. Installing
Tailscale does not close independently exposed services; the guide uses firewall rules for
that. This was a documentation check, not an audit of the server's configuration.

One factual boundary is enough: persistence here means surviving a client disconnect; a
server restart still stops the running processes. The herdr docs distinguish process
continuity from restoring layouts and resuming supported agent sessions.

### Brief mention of the networking issue

Keep this to one short paragraph in the article:

> I also wanted access to other devices on my home network and ran into recurring subnet
> routing problems. Advertising a broader subnet finally made my setup work reliably;
> Tailscale documents the approach in its
> [guide to LAN traffic and overlapping subnet routes](https://tailscale.com/docs/reference/troubleshooting/network-configuration/lan-traffic-overlapping-subnets).
> You don't need subnet routing to connect directly to the server over Tailscale. I plan
> to cover the networking and what runs on my homelab in a deeper article later this year.

The configuration, explanation, limitations, and recorded checks are saved in
[_homelab-networking.md](./_homelab-networking.md) for that future article.

## 4. The server I actually use

This is an existing home server with development added as another workload. Keep the
article section compact: current hardware, approximate spending and power use, a few
existing services, and the preference for upgradeable parts. The purchase history below is
supporting material; it does not need a full table in the article.

Author-provided purchase history:

| Item                | Details                                                                  | Approximate cost |
| ------------------- | ------------------------------------------------------------------------ | ---------------- |
| Original machine    | Used parts from Aukro.cz, roughly three years ago; i5-9400 and 12 GB RAM | 8,000 CZK        |
| RAM upgrade         | From 12 GB to 32 GB, bought used                                         | 3,800 CZK        |
| CPU upgrade         | Used Intel Core i5-13500, replacing the i5-9400                          | 4,000 CZK        |
| Motherboard upgrade | Replacement required by the newer CPU's different socket                 | 2,000 CZK        |

Those reported purchases add up to approximately 17,800 CZK, including the motherboard.
Present that as the total of the listed purchases, not a verified complete build cost. The
original 8,000 CZK bought the earlier configuration.

The previous CPU was still usable. More parallel work and the other server services
motivated the upgrade. Keep the RAM-price frustration personal rather than claiming to
have surveyed today's market.

A read-only `docker ps` check on 2026-09-18 showed 20 running containers, including:

- Home Assistant, Zigbee2MQTT, and Mosquitto.
- Jellyfin and Frigate.
- Umami and its PostgreSQL database.
- Uptime Kuma and other monitoring tools.

Use "around 20 containers" if a count is useful. A few recognizable examples are
sufficient in the article; the complete inventory distracts from the argument.

Hardware opinion:

> I'd buy an upgradeable tower for this. I want room for more RAM, storage, and ordinary
> replacement parts without paying extra to make the box tiny.

The author prefers a standard ATX platform. Explain the preference for upgradeable parts
and the price premium the author associates with ITX boards and SFX power supplies. Avoid
claiming every refurbished business PC has standard components, or that one form factor
always wins on price.

The author reports roughly 40 W measured at the wall with a smart socket during typical
use: around 20 containers, some Codex and Claude Code instances, a dev server, and two
3.5-inch data HDDs. Use this as an approximate personal observation, not an idle-power
figure or controlled benchmark. No need for a generic used-hardware price recommendation.

Keep the local-model distinction short. CPU, RAM, and storage requirements follow the
development workload and concurrency. Hosted models do not eliminate the cost of running
builds, tests, browsers, or containers.

Cloud alternatives need at most a personal sentence: this machine already runs the
author's home services, so using it for development was an obvious choice. Claims about
universal cloud latency, cold starts, or cost add little to this story.

## 5. Make it feel like your normal environment

Keep this to one short paragraph on Fish, Neovim, ripgrep, fzf, Delta, lazygit, and the
author's usual CLI tools. Link the dotfiles repository and explain that GNU Stow manages
the configuration. These were already familiar tools before agents; connecting to the
server brings the author into the same comfortable terminal environment. Mention Homebrew
on Linux only if it helps explain tool installation.

The familiar configuration makes connecting to the server comfortable. Avoid repeating the
claim that the laptop is now just an interface for another section.

## 6. Try it on a machine you already have

End with a direct recommendation and a small, useful experiment:

1. Pick a spare machine that can stay running, or use an existing home server.
2. Install Ubuntu Server if needed, then the usual development tools and agent.
3. Set up Tailscale on the server and client devices, and configure SSH access.
4. Install herdr and clone one repository.
5. Start a task inside herdr, disconnect, and reconnect from another device.

Readers can give the article to an agent and ask for help with the setup. Avoid a
universal promise about how many hours provisioning will take.

Possible closing:

> Give it a task and close the laptop. Come back when you're ready to review the result.

Follow with a brief reference to the next article about skills, reviews, concurrent
agents, and the author's broader workflow. Do not spend a section listing everything this
article excludes.

## Links for the article

- [Ubuntu Server tutorial](https://ubuntu.com/server/docs/tutorial/)
- [Tailscale quickstart](https://tailscale.com/docs/how-to/quickstart)
- [Connecting to devices over Tailscale](https://tailscale.com/docs/how-to/connect-to-devices)
- [Restricting non-Tailscale access on Ubuntu](https://tailscale.com/docs/how-to/secure-ubuntu-server-with-ufw)
- [LAN traffic prioritization and the broader-route workaround](https://tailscale.com/docs/reference/troubleshooting/network-configuration/lan-traffic-overlapping-subnets)
- [herdr documentation](https://herdr.dev/docs)
- [herdr source and installation](https://github.com/herdrdev/herdr)
- [Termius](https://termius.com/)
- [marekh19/dotfiles](https://github.com/marekh19/dotfiles)

The core product and repository links were checked on 2026-09-18. The old
`ogulcancelik/herdr` repository address redirects to `herdrdev/herdr`.

## Visuals

- One architecture diagram showing clients, the home server, and hosted models.
- Screenshots of the same herdr session on laptop and phone.
- Optional photo of the actual server if it helps make the hardware story tangible.
