export const tempProfile = `client
dev tun
proto tcp
remote 127.0.0.1 1194
resolv-retry infinite
nobind
persist-key
persist-tun
remote-cert-tls server
auth SHA512
cipher AES-256-CBC
ignore-unknown-option block-outside-dns
verb 3
<ca>
-----BEGIN CERTIFICATE-----
MIIDSzCCAjOgAwIBAgIUDWc2Y7YY1rngihJ4VVZ1TUDxptowDQYJKoZIhvcNAQEL
BQAwFjEUMBIGA1UEAwwLRWFzeS1SU0EgQ0EwHhcNMjMwMTA1MjE0MjI5WhcNMzMw
MTAyMjE0MjI5WjAWMRQwEgYDVQQDDAtFYXN5LVJTQSBDQTCCASIwDQYJKoZIhvcN
AQEBBQADggEPADCCAQoCggEBALx3xHbLWODcWa4UK/EiJoeZaLR+p3EoyRpdXmUe
bWtHYc7UPHSbjFhWX6EIYnez0VGCJWtMFlsMz0E/A2YtbswALphfWi+6BdfCffcB
ddvqxJtpy0WG+yQb8+ZW1GYRw8P5v01wCViBqj1ReiZu2QGj9mhW3Jm+NTaRHMgi
zeAUaih+vvopXAkMwni2vQhGjTHFC4FY7gTX8gIc+EDaHTZYmQ3n8JNeIUUCiX5p
OB/8icHaYehSATUVIizj7peYu92RjzWVJjVFWXvrqoxhM9ErEw/TEvqFiVEijrc4
/h0Mc4S1PNNeKN8NQPC75TP6+javdgBEj1AtCNCbIdKjHAECAwEAAaOBkDCBjTAM
BgNVHRMEBTADAQH/MB0GA1UdDgQWBBTTVUB15o/DG+VgwRJ/Ccryksd4sTBRBgNV
HSMESjBIgBTTVUB15o/DG+VgwRJ/Ccryksd4saEapBgwFjEUMBIGA1UEAwwLRWFz
eS1SU0EgQ0GCFA1nNmO2GNa54IoSeFVWdU1A8abaMAsGA1UdDwQEAwIBBjANBgkq
hkiG9w0BAQsFAAOCAQEAbSior3DwSsq/Z+eDiDnDYHdwKfO9LpP8hqzaiqJPR42f
lOU8m3YwTo/7AWERhYQEoRnnhkeQc19Bduqi65sGJ7GLuMEMHm43mDdmVTJR9/C6
hS1xF8siZmJ+w/wp86RZBty8qrb0RWYLy1E4G7O6eFVnxZu6UySdRHkqbsvN3Yg9
QZDwCnT0JbYK3wJQd0L57WD3FXaBHtl2wt7DoR0lcwd+VAeR1RXjoISnJd8AzYFv
tl/b769j2yVbZ6Tmui6QVy7gBgCJYPE9YhZ7kC+MMtnT91no0/UDJX82CDE7mpq4
/Gg5U6dHU2iRm8iLYbVQ28HXYLoBylJJkq0ZyINf4Q==
-----END CERTIFICATE-----
</ca>
<cert>
-----BEGIN CERTIFICATE-----
MIIDUTCCAjmgAwIBAgIQWEzNNm4gvmHj8MRLLceCVjANBgkqhkiG9w0BAQsFADAW
MRQwEgYDVQQDDAtFYXN5LVJTQSBDQTAeFw0yMzAxMDUyMTQyMjlaFw0zMzAxMDIy
MTQyMjlaMA4xDDAKBgNVBAMMAzEzOTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCC
AQoCggEBAOfEjKsBijPWbajo97yjF2Sx4BA6bJaZkRvLjAGhwNCH7ODBNMBlh/pb
wHjlMbLzDEYrwDFN94X2vPYOUYOkmi3lktTxRDEZN2bT8hjN8J8Kqdf7col1GZEK
1/zAm3h7gkvuMjI7JjGhcvuu7eZHVc9lJp1TF9XqPjqlNpfCs3eGiFp4vwcaJ+HI
p5ko7Yhwx9joBF0ldqwzbsloWigxS7UWEZj+1kq2Mo7MHLqWRUMImwC8jZwGP8Iq
XnolEDZgge0z0PUTb1Dsi8YL0dHzcYTyyp4qnl0x6Bw3ty0PWsb/3TJz61HcDneq
sE3xNY/+Q+vcm9OVVTGDwUFmRRyKJuUCAwEAAaOBojCBnzAJBgNVHRMEAjAAMB0G
A1UdDgQWBBQ8MK/aY2V+BJxhLCI6yGtEvZYdlzBRBgNVHSMESjBIgBTTVUB15o/D
G+VgwRJ/Ccryksd4saEapBgwFjEUMBIGA1UEAwwLRWFzeS1SU0EgQ0GCFA1nNmO2
GNa54IoSeFVWdU1A8abaMBMGA1UdJQQMMAoGCCsGAQUFBwMCMAsGA1UdDwQEAwIH
gDANBgkqhkiG9w0BAQsFAAOCAQEAmpLCyvGUJWWSTOM+v/X6KVSN/Hk2twXbtQXg
i6ZD8ge6LV9R86sUexrK4d5pXj9Jc3YSzb56RLUwmxVYQWEMbEosxfxBP7S2fPNP
ns3ZmsEideqaoDfVo4mzPybktHIClb5tSsuQSHp5D0c1pinV4a2A2OLMdiqerK5c
9c25Ecdmtjij849p4jdsskGlxDk9jMa3qUeramxw9eRiJRdUPXxgrZufnkFGWWa8
aIe2M4d5as0x0pbOdx2iFkwlcrBSX88hQEEVh6rZjOz5Q8DevlrAm/ShdDHc5KYe
7itmWA3l6AWM4qHRLpLrbwtUXuO9wUFWn+CztFNGFUrf4zniZw==
-----END CERTIFICATE-----
</cert>
<key>
-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDnxIyrAYoz1m2o
6Pe8oxdkseAQOmyWmZEby4wBocDQh+zgwTTAZYf6W8B45TGy8wxGK8AxTfeF9rz2
DlGDpJot5ZLU8UQxGTdm0/IYzfCfCqnX+3KJdRmRCtf8wJt4e4JL7jIyOyYxoXL7
ru3mR1XPZSadUxfV6j46pTaXwrN3hohaeL8HGifhyKeZKO2IcMfY6ARdJXasM27J
aFooMUu1FhGY/tZKtjKOzBy6lkVDCJsAvI2cBj/CKl56JRA2YIHtM9D1E29Q7IvG
C9HR83GE8sqeKp5dMegcN7ctD1rG/90yc+tR3A53qrBN8TWP/kPr3JvTlVUxg8FB
ZkUciiblAgMBAAECggEAOJcTScXses/GotGPe+3OjnWoIg5B6VvBxKmkm9lk/QXT
XuWN/dRMqWKx0lMUGX+i5ZdVLDS/VWRzqxi/6obMZpyBh6EJZ3uivWbO3COctxih
c+0fgFSpU3L0XfChhX+Sxvt4Ii+zGbc0HiQOToXoe+VU0mExlrfFTgh9Ff0iWPJ3
cD0sqdpA1+LBff7MKir/LoYN2KDjq6/3jxGVAlCoVbhahz8+MoqYKtiIFNmzxWeh
Oh2GVCxNijBdFsJGTYTzFTRXvT/PMmigsfcszYTDCu3qqQzdTEgOSR1BlSkw0wE8
ADa6EYvl2Kky0O5Q11EAVVyoCgl/lkO5olkuFP5bmQKBgQD1Wq/hMGX5A5uX5XGw
1z2tCDXpY961tig06KhthZISgTCMKT5AxNrz6YtfD4hBdciG0phMr+ITRmxI7xEy
S/10esB5WeCejKxr+CRJj7ohhkKxwQ9/5RIi3dbyZk9/nLxd5GHhLPtG1Ev5suR3
taUHBjGAFho/OwH2O0m3ydwcPwKBgQDx0vLMgy37EGqJHWTYRfZjAYB5QUmg7IPM
kCIuzftcjWDcocw1H1QdQCqVtw6ET94Y0uCCzplQ0q1cntROSfBehcDaefY9a+mO
sWXnd7poSOc7mIvNqTdf3JLUzLhmuoAtd9BIiCmENrHhGCLSj2qeB/v4yhg5YuNy
TDvWVcbD2wKBgFe4R5+EVUD1WECzaLVoDwX5JIVADpT6/l8EO4uEsNfq1neWG0q+
1uVTv1+KRxXYTYxeaNMqIvLvP7HHv2czIffuFziLuLIW62Jiwl6Gg26O+PNiae84
8AYFOF9L0up2GCadi50dHu2Q42Tv350pFUpwnWwE+vdWWno1ckLCae6zAoGAXqNf
wgnUhNz31JFcVgeLVVPRI6MZXZEyQ2xk9ExIgwARWEc509Be6tOh1tW9KKrZEH32
vzp7ZdYNYqIGFF17ZIKT5uy0IXWKAf4LE3sXyJg/ZmNc0y/WK/32uLEluY5je2fY
a4peNQ/yrVT0y9K0twQI6GSu9kZtHN4YzNjk4OECgYBDeUt710y/XeNIfUNORRtE
KYmccbOjw1WB29YQIBLcEqfYzdrQyb3vuXtnVtnq5oIkL8WC7Y73aBSLC5cxOJ2t
LFyVf0vLnbqQ6LCbLRpkkpWWV8lRp9XIUfXm6x4tye+LoS/L7WxUjHyWEhO7DIOF
I0LRWHyd7ROsYm/M0ThE+A==
-----END PRIVATE KEY-----
</key>
<tls-crypt>
-----BEGIN OpenVPN Static key V1-----
9c79abccb2e4bec631b6fd075fd6b676
cd86345f97835b8102659da22de8ae3e
997662d326db5bd26cf3f0b5c8b53585
b6de2fdcb757b04559ac34513ea232aa
f55df31fd6c4e4740d3d7d0b4356054c
34590de5d317f2d49d4932055e925571
567d8728bbaf43902a19c4c6500552f1
733184c7e1d44eec8a92ffbfffb07186
c30c3dd5a6d918b8d9777aa1d6a95611
24830b3400fdacc839f3623e4b044c92
1e36f0efb77daa94d04be397cb90aead
47bab279271cd7e069ae7d4f4eac3922
31f4afe99aa8c8c26936cc1121917874
291c4f0c284e21b9e8ffc1f4674dceef
83018b39718d94e287b34acc121076c8
11b2d172641d7d81ee98af82c907e0dc
-----END OpenVPN Static key V1-----
</tls-crypt>`;