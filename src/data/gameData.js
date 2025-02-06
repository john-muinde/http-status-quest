// gameData.js
export const statusCategories = {
    "1xx Informational": [
      { code: 100, name: "Continue" },
      { code: 101, name: "Switching Protocols" },
      { code: 102, name: "Processing" },
      { code: 103, name: "Early Hints" }
    ],
    "2xx Success": [
      { code: 200, name: "OK" },
      { code: 201, name: "Created" },
      { code: 202, name: "Accepted" },
      { code: 203, name: "Non-Authoritative Information" },
      { code: 204, name: "No Content" },
      { code: 205, name: "Reset Content" },
      { code: 206, name: "Partial Content" },
      { code: 207, name: "Multi-Status" },
      { code: 208, name: "Already Reported" },
      { code: 226, name: "IM Used" }
    ],
    "3xx Redirection": [
      { code: 300, name: "Multiple Choices" },
      { code: 301, name: "Moved Permanently" },
      { code: 302, name: "Found" },
      { code: 303, name: "See Other" },
      { code: 304, name: "Not Modified" },
      { code: 307, name: "Temporary Redirect" },
      { code: 308, name: "Permanent Redirect" }
    ],
    "4xx Client Error": [
      { code: 400, name: "Bad Request" },
      { code: 401, name: "Unauthorized" },
      { code: 402, name: "Payment Required" },
      { code: 403, name: "Forbidden" },
      { code: 404, name: "Not Found" },
      { code: 405, name: "Method Not Allowed" },
      { code: 406, name: "Not Acceptable" },
      { code: 407, name: "Proxy Authentication Required" },
      { code: 408, name: "Request Timeout" },
      { code: 409, name: "Conflict" },
      { code: 410, name: "Gone" },
      { code: 411, name: "Length Required" },
      { code: 412, name: "Precondition Failed" },
      { code: 413, name: "Payload Too Large" },
      { code: 414, name: "URI Too Long" },
      { code: 415, name: "Unsupported Media Type" },
      { code: 416, name: "Range Not Satisfiable" },
      { code: 417, name: "Expectation Failed" },
      { code: 418, name: "I'm a teapot" },
      { code: 421, name: "Misdirected Request" },
      { code: 422, name: "Unprocessable Entity" },
      { code: 423, name: "Locked" },
      { code: 424, name: "Failed Dependency" },
      { code: 425, name: "Too Early" },
      { code: 426, name: "Upgrade Required" },
      { code: 428, name: "Precondition Required" },
      { code: 429, name: "Too Many Requests" },
      { code: 431, name: "Request Header Fields Too Large" },
      { code: 451, name: "Unavailable For Legal Reasons" }
    ],
    "5xx Server Error": [
      { code: 500, name: "Internal Server Error" },
      { code: 501, name: "Not Implemented" },
      { code: 502, name: "Bad Gateway" },
      { code: 503, name: "Service Unavailable" },
      { code: 504, name: "Gateway Timeout" },
      { code: 505, name: "HTTP Version Not Supported" },
      { code: 506, name: "Variant Also Negotiates" },
      { code: 507, name: "Insufficient Storage" },
      { code: 508, name: "Loop Detected" },
      { code: 510, name: "Not Extended" },
      { code: 511, name: "Network Authentication Required" }
    ]
  };
  
  export const gameLevels = [
    // Basic Levels
    {
      id: 1,
      title: "Missing in Action",
      difficulty: "easy",
      description: "A user requests a profile that was deleted last week. Which status code should be returned?",
      method: "GET",
      endpoint: "/api/users/42",
      expectedCode: 404,
      hint: "Think about what happens when a resource doesn't exist.",
      bonusPoints: 100
    },
    // Authentication & Authorization
    {
      id: 2,
      title: "VIP Access Only",
      difficulty: "medium",
      description: "A logged-in user tries to access admin features. They have valid credentials but aren't an admin.",
      method: "GET",
      endpoint: "/api/admin/dashboard",
      expectedCode: 403,
      hint: "The user is authenticated but lacks proper permissions.",
      bonusPoints: 150
    },
    // Complex Scenarios
    {
      id: 3,
      title: "Race Condition",
      difficulty: "hard",
      description: "Two users try to update the same document simultaneously. User B's version is based on an outdated state.",
      method: "PUT",
      endpoint: "/api/documents/123",
      headers: {
        "If-Match": "\"abc123\"",
        "Content-Type": "application/json"
      },
      expectedCode: 412,
      hint: "The precondition (ETag) check failed.",
      bonusPoints: 200
    },
    // Real-world Edge Cases
    {
      id: 4,
      title: "Content Negotiation",
      difficulty: "expert",
      description: "Client requests XML format but the API only supports JSON. What's the appropriate response?",
      method: "GET",
      endpoint: "/api/data",
      headers: {
        "Accept": "application/xml"
      },
      expectedCode: 406,
      hint: "The server can't fulfill the Accept header requirements.",
      bonusPoints: 250
    },
    // ... more challenging levels ...
    {
      id: 5,
      title: "API Rate Limit",
      difficulty: "medium",
      description: "Client has made 1000 requests in the last minute, exceeding the rate limit of 100 requests per minute.",
      method: "GET",
      endpoint: "/api/feed",
      headers: {
        "X-Rate-Limit-Remaining": "0"
      },
      expectedCode: 429,
      hint: "Think about rate limiting responses.",
      bonusPoints: 175
    },
    {
      id: 6,
      title: "Legal Blockade",
      difficulty: "hard",
      description: "User requests content that has been taken down due to a DMCA notice.",
      method: "GET",
      endpoint: "/api/videos/copyright-violation",
      expectedCode: 451,
      hint: "This content is unavailable for legal reasons.",
      bonusPoints: 200
    },
    {
      id: 7,
      title: "Conditional Processing",
      difficulty: "expert",
      description: "Client tries to modify a resource with If-Unmodified-Since header, but the resource was updated 5 minutes ago.",
      method: "PATCH",
      endpoint: "/api/articles/789",
      headers: {
        "If-Unmodified-Since": "Wed, 21 Oct 2015 07:28:00 GMT"
      },
      expectedCode: 412,
      hint: "The precondition check failed due to resource modification.",
      bonusPoints: 250
    },
    {
      id: 8,
      title: "Proxy Problems",
      difficulty: "hard",
      description: "Request through a proxy server requires authentication but no proxy credentials provided.",
      method: "GET",
      endpoint: "/api/secure-content",
      headers: {
        "Proxy-Authorization": null
      },
      expectedCode: 407,
      hint: "Think about proxy-specific authentication requirements.",
      bonusPoints: 225
    }
  ];
  
  export const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
    expert: "bg-purple-100 text-purple-800"
  };
  
  export const methodColors = {
    GET: "bg-blue-100 text-blue-800",
    POST: "bg-green-100 text-green-800",
    PUT: "bg-yellow-100 text-yellow-800",
    DELETE: "bg-red-100 text-red-800",
    PATCH: "bg-purple-100 text-purple-800"
  };