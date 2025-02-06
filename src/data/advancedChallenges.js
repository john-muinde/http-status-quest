// advancedChallenges.js
export const advancedChallenges = [
  {
    id: "microservices-cascade",
    title: "Microservices Cascade Failure",
    difficulty: "expert",
    description:
      "In a microservices architecture, Service A calls Service B, which calls Service C. Service C is down. Service B has a circuit breaker that's now open. What status should Service A return to the client?",
    method: "GET",
    endpoint: "/api/service-a/data",
    expectedCode: 503,
    hint: "Think about service availability in a distributed system.",
    explanation:
      "When a downstream service is unavailable and circuit breakers are open, we indicate the service is temporarily unavailable.",
    bonusPoints: 300,
    headers: {
      "Circuit-State": "OPEN",
      "Downstream-Status": "DEGRADED",
    },
  },
  {
    id: "websocket-upgrade",
    title: "WebSocket Protocol Switch",
    difficulty: "expert",
    description:
      "Client requests a WebSocket connection upgrade with proper headers. Server accepts. What's the correct status code?",
    method: "GET",
    endpoint: "/ws",
    expectedCode: 101,
    hint: "This involves changing communication protocols.",
    explanation:
      "101 Switching Protocols is used when upgrading from HTTP to WebSocket.",
    bonusPoints: 250,
    headers: {
      Upgrade: "websocket",
      Connection: "Upgrade",
      "Sec-WebSocket-Key": "dGhlIHNhbXBsZSBub25jZQ==",
    },
  },
  {
    id: "multipart-resume",
    title: "Resume Large Upload",
    difficulty: "expert",
    description:
      "Client is resuming a large file upload and requests a specific byte range. Server accepts the range. What status code should be used?",
    method: "PUT",
    endpoint: "/api/files/large-video.mp4",
    expectedCode: 308,
    hint: "This is about permanent redirection with range requests.",
    explanation:
      "308 Permanent Redirect maintains the method and body for range requests.",
    bonusPoints: 275,
    headers: {
      Range: "bytes=1048576-",
      "Content-Type": "video/mp4",
      "Upload-ID": "abc123",
    },
  },
  {
    id: "etag-validation",
    title: "Content Validation Dance",
    difficulty: "expert",
    description:
      "Client sends both If-Match and If-None-Match headers. If-Match matches, but If-None-Match also matches. What status code should be returned?",
    method: "GET",
    endpoint: "/api/documents/spec.pdf",
    expectedCode: 304,
    hint: "When multiple conditional headers are present, think about precedence.",
    explanation:
      "304 Not Modified takes precedence when If-None-Match matches, even if If-Match also matches.",
    bonusPoints: 350,
    headers: {
      "If-Match": '"123abc"',
      "If-None-Match": '"123abc"',
      "If-Modified-Since": "Wed, 21 Oct 2015 07:28:00 GMT",
    },
  },
  {
    id: "auth-delegation",
    title: "OAuth Dance Challenge",
    difficulty: "expert",
    description:
      "Client presents an expired access token but a valid refresh token. The authorization server is temporarily down. What status should the resource server return?",
    method: "GET",
    endpoint: "/api/protected-resource",
    expectedCode: 503,
    hint: "Consider the authentication infrastructure's availability.",
    explanation:
      "503 Service Unavailable is appropriate when auth infrastructure is down.",
    bonusPoints: 325,
    headers: {
      Authorization: "Bearer expired_token",
      "X-Refresh-Token": "valid_refresh_token",
      "Auth-Server-Status": "UNAVAILABLE",
    },
  },
  {
    id: "content-negotiation-complex",
    title: "Content Negotiation Maze",
    difficulty: "expert",
    description:
      "Client requests JSON with quality 0.8, XML with quality 0.9, and YAML with quality 1.0. Server only has HTML and JSON representations. What status code?",
    method: "GET",
    endpoint: "/api/data",
    expectedCode: 406,
    hint: "Think about content negotiation and acceptable quality factors.",
    explanation:
      "406 Not Acceptable as the server can't fulfill the preferred content types.",
    bonusPoints: 300,
    headers: {
      Accept:
        "application/json;q=0.8, application/xml;q=0.9, application/yaml;q=1.0",
      "Available-Types": "text/html, application/json",
    },
  },
];

export const realWorldScenarios = [
  {
    id: "cdn-cache",
    title: "CDN Cache Dilemma",
    difficulty: "expert",
    description:
      "A request hits your CDN for stale content, but the origin server is down. The CDN's stale-while-revalidate directive allows serving stale content. What status code should be returned?",
    method: "GET",
    endpoint: "/api/cached-content",
    expectedCode: 203,
    hint: "Think about non-authoritative responses in caching scenarios.",
    explanation:
      "203 Non-Authoritative Information indicates the response is valid but not from the origin server.",
    bonusPoints: 350,
    headers: {
      Age: "7200",
      "Cache-Control": "stale-while-revalidate=3600",
      "Origin-Status": "UNAVAILABLE",
    },
  },
  {
    id: "blockchain-consensus",
    title: "Blockchain Consensus Challenge",
    difficulty: "expert",
    description:
      "A blockchain node receives a transaction but can't reach consensus with other nodes due to network partitioning. What status should it return?",
    method: "POST",
    endpoint: "/api/blockchain/transaction",
    expectedCode: 409,
    hint: "Consider distributed consensus and conflict scenarios.",
    explanation:
      "409 Conflict indicates the transaction can't be processed due to the network state.",
    bonusPoints: 400,
    headers: {
      "Consensus-Status": "UNREACHABLE",
      "Network-Partition": "DETECTED",
      "Node-Status": "ACTIVE",
      "Chain-Height": "12345",
    },
  },
  {
    id: "grpc-http-mapping",
    title: "gRPC to HTTP Challenge",
    difficulty: "expert",
    description:
      "A gRPC service returns RESOURCE_EXHAUSTED. Your API gateway needs to map this to the appropriate HTTP status code. What should it be?",
    method: "POST",
    endpoint: "/api/grpc-proxy",
    expectedCode: 429,
    hint: "Think about how gRPC status codes map to HTTP.",
    explanation: "429 Too Many Requests maps to gRPC's RESOURCE_EXHAUSTED.",
    bonusPoints: 375,
    headers: {
      "Content-Type": "application/grpc",
      "grpc-status": "8",
      "grpc-message": "Resource exhausted: quota exceeded",
    },
  },
  {
    id: "zero-copy-upload",
    title: "Zero-Copy Upload Challenge",
    difficulty: "expert",
    description:
      "Client requests to upload a file using zero-copy optimization, but the server's kernel doesn't support it. What status code should be returned?",
    method: "PUT",
    endpoint: "/api/files/upload",
    expectedCode: 501,
    hint: "Think about server capability limitations.",
    explanation:
      "501 Not Implemented indicates the server doesn't support the requested functionality.",
    bonusPoints: 325,
    headers: {
      "Upload-Type": "zero-copy",
      "X-Server-Capability": "standard-only",
      "Content-Length": "1073741824",
    },
  },
  {
    id: "quantum-signature",
    title: "Quantum Signature Verification",
    difficulty: "expert",
    description:
      "A request with a quantum-resistant signature is received, but the server's quantum verification module is temporarily offline. What status code?",
    method: "POST",
    endpoint: "/api/quantum-secure",
    expectedCode: 503,
    hint: "Consider infrastructure availability for specialized security features.",
    explanation:
      "503 Service Unavailable when critical security infrastructure is down.",
    bonusPoints: 450,
    headers: {
      "Signature-Type": "quantum-resistant",
      "QKD-Status": "OFFLINE",
      "Verification-Module": "UNAVAILABLE",
    },
  },
];

export const specialChallenges = [
  {
    id: "time-drift",
    title: "Time Drift Detection",
    difficulty: "expert",
    description:
      "Client's timestamp is 5 minutes ahead of server time, exceeding the 2-minute drift tolerance. What status code should be returned?",
    method: "POST",
    endpoint: "/api/time-sensitive",
    expectedCode: 400,
    hint: "Think about client-side issues with time synchronization.",
    explanation: "400 Bad Request for invalid client-side timing.",
    bonusPoints: 300,
    headers: {
      "Client-Timestamp": "2024-02-06T12:05:00Z",
      "Server-Timestamp": "2024-02-06T12:00:00Z",
      "Drift-Tolerance": "120",
    },
  },
  {
    id: "kafka-stream",
    title: "Kafka Stream Processing",
    difficulty: "expert",
    description:
      "A streaming request is made but all Kafka partitions are currently at their retention limit. What status code should be returned?",
    method: "POST",
    endpoint: "/api/stream/events",
    expectedCode: 507,
    hint: "Think about storage capacity issues.",
    explanation:
      "507 Insufficient Storage when the system cannot store more data.",
    bonusPoints: 400,
    headers: {
      "X-Partition-Status": "FULL",
      "Retention-Policy": "7d",
      "Stream-Backpressure": "ACTIVE",
    },
  },
];
