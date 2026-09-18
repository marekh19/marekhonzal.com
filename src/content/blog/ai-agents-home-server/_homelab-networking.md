# Saved notes: homelab networking and Tailscale subnet routes

Extracted from [_notes.md](./_notes.md) for the planned article, "What's on my homelab",
later this year. Keep the detailed routing explanation here; the agent article needs only
a brief mention and a link to Tailscale's guide.

The checks below were recorded in the original notes on 2026-09-18. They were not rerun
when extracting this file.

## The subnet-routing problem that kept coming back

Include this real setup difficulty. The author repeatedly struggled to connect reliably,
and the fixes recorded in the August runbook did not resolve the recurring problem. The
author reports that changing the advertised subnet from `/24` to `/23` finally made the
setup work reliably.

Read-only checks on 2026-09-18 confirmed:

| Setting                                              | Current value                                       |
| ---------------------------------------------------- | --------------------------------------------------- |
| Physical home LAN                                    | `192.168.1.0/24`                                    |
| Advertised subnet in `tailscale debug prefs`         | `192.168.0.0/23`                                    |
| Subnet in `Self.AllowedIPs` and `Self.PrimaryRoutes` | `192.168.0.0/23`                                    |
| Tailscale state                                      | Running, server online, no reported health warnings |
| IPv4 and IPv6 forwarding                             | Enabled                                             |

The LAN itself was not changed to `/23`. The advertised range covers both `192.168.0.x`
and `192.168.1.x`.

Explain the mechanism briefly: on macOS, the local `/24` route is more specific than the
advertised `/23`, so local traffic takes the LAN route at home. Away, the `/23` can carry
home traffic through Tailscale when no more-specific route overrides it. Tailscale
documents this workaround in its
[LAN traffic prioritization guide](https://tailscale.com/docs/reference/troubleshooting/network-configuration/lan-traffic-overlapping-subnets).
Linux uses policy routing, so the same prefix change is not a universal Linux fix.

If a visited network also uses `192.168.1.0/24`, its local route still wins. This
workaround does not resolve duplicate home and remote address ranges. Tailscale cautions
about using it on roaming devices because intended home traffic can reach the visited LAN.

Explain why this is useful - accessing services on the home network via their ip, while
not being connected to tailscale still works fine and the same addresses would keep
working when on the go just on tailnet. This way you can even configure your router on the
home network while not being physically there or I can turn on light bulb via home
assistant or check Frigate security cameras feed - more on that in a later article "What's
on my homelab" - plan to write one later this year.

Possible personal introduction:

> Getting this working wasn't entirely painless. I also wanted access to devices on my
> home network, so I configured subnet routing. I kept running into connection problems,
> and my earlier fixes didn't stick. What finally worked for me was advertising
> `192.168.0.0/23` instead of `192.168.1.0/24`.

Keep the scope clear: direct access to the server's Tailscale address does not require
this subnet route. The older runbook also describes DNS and daemon failures. Today's
server state confirms the configuration, but cannot establish the cause of every past
outage or verify the Mac's current route selection. No client-side route test was run.

Use the private subnet ranges to explain the mechanism. Account identifiers, actual
tailnet addresses, private DNS names, and the full runbook are unnecessary in the article.

## References

- [Tailscale subnet routers](https://tailscale.com/docs/features/subnet-routers)
- [LAN traffic prioritization and overlapping subnet routes](https://tailscale.com/docs/reference/troubleshooting/network-configuration/lan-traffic-overlapping-subnets)
