import socket
import uuid


def get_mac_address():
    mac = uuid.UUID(int=uuid.getnode()).hex[-12:]
    return ':'.join([mac[e:e+2] for e in range(0, 11, 2)])


def get_ip_addresses():
    ipv4_address = None
    ipv6_address = None

    # Get the hostname
    hostname = socket.gethostname()

    # Get IP addresses associated with the hostname
    addresses = socket.getaddrinfo(hostname, None)

    for address in addresses:
        family, _, _, _, sockaddr = address
        ip = sockaddr[0]

        if family == socket.AF_INET:
            ipv4_address = ip
        elif family == socket.AF_INET6:
            ipv6_address = ip

    return ipv4_address, ipv6_address


# Usage
mac_address = get_mac_address()
ipv4, ipv6 = get_ip_addresses()

# test print
print(f"MAC Address: {mac_address}")
print(f"IPv4 Address: {ipv4}")
print(f"IPv6 Address: {ipv6}")
