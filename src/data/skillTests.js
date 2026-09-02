// Scenario-Based Practical Assessments for Engineering Skills
// Evaluates practical engineering knowledge and awards:
// - Advanced (>= 80%)
// - Intermediate (60% - 79%)
// - Beginner (< 60%)

export const SKILL_TEST_BANKS = {
  'Data Structures & Algorithms': [
    {
      id: 'dsa-1',
      scenario: 'High-Volume Order Processing Engine',
      question: 'You are architecting a real-time trading engine that needs to continuously track and return the top 10 highest bids among millions of rapidly arriving and expiring stock orders. Which data structure provides the most optimal time complexity for continuous updates and top-K extraction?',
      options: [
        { value: 'A', text: 'Sorted Array shifted on each insert (O(n) insert, O(1) peek)' },
        { value: 'B', text: 'Min-Heap of fixed size 10 (O(log K) insert/update, O(1) peek)' },
        { value: 'C', text: 'Unordered Hash Map with linear scan on query (O(1) insert, O(n) peek)' },
        { value: 'D', text: 'Singly Linked List with bubble sorting on access' }
      ],
      correct: 'B',
      explanation: 'A fixed-size Min-Heap of size K (10) allows checking if a new order exceeds the current minimum in O(1) and updating in O(log K) time, maintaining the top 10 elements with minimal memory and latency.'
    },
    {
      id: 'dsa-2',
      scenario: 'Microservice Build Dependency Resolver',
      question: 'Your CI/CD build system receives a graph of 50 interdependent microservices and must determine whether circular dependencies (deadlocks) exist, and if not, compute a valid compilation sequence. Which algorithmic strategy should you apply?',
      options: [
        { value: 'A', text: 'Breadth-First Search (BFS) finding shortest path' },
        { value: 'B', text: 'Topological Sort using Kahn’s Algorithm (in-degree tracking) or DFS with cycle detection' },
        { value: 'C', text: 'Dijkstra’s Algorithm with positive edge weights' },
        { value: 'D', text: 'Kruskal’s Minimum Spanning Tree algorithm' }
      ],
      correct: 'B',
      explanation: 'Topological sorting on a Directed Acyclic Graph (DAG) validates dependency ordering and identifies cycles if the resolved nodes count is less than the total graph vertex count.'
    },
    {
      id: 'dsa-3',
      scenario: 'Cache-Friendly Matrix Operations',
      question: 'You are profiling a performance-critical matrix transformation on a large 2D array in C++/Python (row-major memory layout). The algorithm is running 8x slower than expected due to CPU L1/L2 cache misses. How do you resolve this?',
      options: [
        { value: 'A', text: 'Traverse elements column-by-column across non-contiguous memory addresses' },
        { value: 'B', text: 'Traverse row-by-row sequentially (spatial locality) or use blocked/tiled matrix traversal' },
        { value: 'C', text: 'Convert all elements to dynamic linked node pointers' },
        { value: 'D', text: 'Recompute values on demand instead of accessing memory' }
      ],
      correct: 'B',
      explanation: 'Row-major arrays are stored contiguously in memory. Accessing row-by-row leverages CPU hardware prefetchers and spatial cache lines, drastically cutting down cache miss penalties.'
    },
    {
      id: 'dsa-4',
      scenario: 'Global Search Autocomplete Index',
      question: 'A search engine requires prefix-based suggestions (e.g. typing "dist" returns "distributed", "distribute", "distance") across 5 million indexed keywords with latency under 5 milliseconds. What data structure is optimal?',
      options: [
        { value: 'A', text: 'Standard Binary Search Tree' },
        { value: 'B', text: 'Trie (Prefix Tree) or Compressed Radix Tree with precomputed frequency scores' },
        { value: 'C', text: 'Circular Doubly Linked List' },
        { value: 'D', text: 'Disjoint Set Union (DSU) array' }
      ],
      correct: 'B',
      explanation: 'A Trie enables prefix lookup in O(L) time where L is prefix length, completely independent of the total number of words in the dictionary.'
    },
    {
      id: 'dsa-5',
      scenario: 'Real-Time Streaming Median Tracker',
      question: 'A financial sensor receives a continuous stream of numerical measurements and must output the running median after every incoming number. Re-sorting the entire dataset on each number is too slow. What is the optimal dual-heap approach?',
      options: [
        { value: 'A', text: 'Use a single Max-Heap and iterate through half its elements' },
        { value: 'B', text: 'Maintain a Max-Heap for the smaller half and a Min-Heap for the larger half, balanced to within 1 element' },
        { value: 'C', text: 'Use two Hash Tables with sorted key indices' },
        { value: 'D', text: 'Use an unordered stack and queue in tandem' }
      ],
      correct: 'B',
      explanation: 'Balancing a Max-Heap (stores smaller half) and a Min-Heap (stores larger half) gives median lookup in O(1) time and stream insertion in O(log n) time.'
    }
  ],

  'React & Frontend Dev': [
    {
      id: 'react-1',
      scenario: 'Excessive Re-Rendering in Real-Time Dashboard',
      question: 'A real-time telemetry component renders 200 child metric cards. Every time the parent state updates a clock timer every second, all 200 child cards re-render, causing perceptible UI jank. What is the canonical fix?',
      options: [
        { value: 'A', text: 'Move all state into global window variables' },
        { value: 'B', text: 'Wrap child cards in React.memo and memoize callback handlers using useCallback with stable dependencies' },
        { value: 'C', text: 'Replace functional components with direct document.createElement calls' },
        { value: 'D', text: 'Force re-render using useReducer' }
      ],
      correct: 'B',
      explanation: 'React.memo skips re-rendering when props have not shallowly changed, and useCallback prevents function prop identity from invalidating on every parent tick.'
    },
    {
      id: 'react-2',
      scenario: 'Race Conditions in Asynchronous Autocomplete',
      question: 'In a search input, a user quickly types "cat" then "catch". Due to network latency, the response for "cat" arrives after the response for "catch", overwriting the newer results with older data. How do you prevent this asynchronous race condition?',
      options: [
        { value: 'A', text: 'Increase the setTimeout delay in the component render loop' },
        { value: 'B', text: 'Use an AbortController in useEffect cleanup to cancel stale in-flight fetch requests, or track an active request ID flag' },
        { value: 'C', text: 'Disable user input until every API request responds' },
        { value: 'D', text: 'Store API responses in synchronous local state only' }
      ],
      correct: 'B',
      explanation: 'Cleaning up in-flight requests with AbortController ensures that responses from superseded inputs are safely discarded and cannot mutate component state.'
    },
    {
      id: 'react-3',
      scenario: 'Rendering Massive Data Grids (50,000+ Rows)',
      question: 'A financial dashboard needs to display 50,000 transaction rows. Mounting 50,000 actual DOM nodes causes browser memory spikes and freezes scrolling. Which design pattern resolves this?',
      options: [
        { value: 'A', text: 'Windowing / Virtualization (e.g. react-window) that renders only the visible viewport rows into the DOM' },
        { value: 'B', text: 'Wrapping the entire list in a CSS blur filter' },
        { value: 'C', text: 'Using setTimeout to append 100 rows every millisecond' },
        { value: 'D', text: 'Storing rows in an unindexed localStorage string' }
      ],
      correct: 'A',
      explanation: 'Virtualization calculates the scroll position and renders only the ~30 rows currently visible inside the viewport, keeping DOM node count minimal.'
    },
    {
      id: 'react-4',
      scenario: 'Concurrent React & Non-Blocking Updates',
      question: 'A search filter updates both an immediate input display and an expensive graph filtering operation. The user experiences typing lag because the graph calculation blocks the main thread. How should this be handled in modern React?',
      options: [
        { value: 'A', text: 'Use startTransition (or useTransition / useDeferredValue) to mark the graph update as non-urgent' },
        { value: 'B', text: 'Block the input using an alert dialog until the graph renders' },
        { value: 'C', text: 'Use synchronous while loops to throttle user clicks' },
        { value: 'D', text: 'Move React rendering to an offline web worker thread' }
      ],
      correct: 'A',
      explanation: 'startTransition tells React that the update is interruptible. React keeps the text input responsive to keystrokes while rendering the heavy computation concurrently.'
    },
    {
      id: 'react-5',
      scenario: 'Stale Closure in Interval Hooks',
      question: 'Inside a custom useInterval hook, a timer callback reads a count state variable that remains stuck at 0 despite multiple tick increments. What causes this and how is it resolved?',
      options: [
        { value: 'A', text: 'React does not support setInterval' },
        { value: 'B', text: 'Stale closure capturing initial render state; resolve by using functional state updates (setCount(prev => prev + 1)) or useRef for the callback' },
        { value: 'C', text: 'Component needs to be remounted on every millisecond' },
        { value: 'D', text: 'The browser tab is hibernating' }
      ],
      correct: 'B',
      explanation: 'The closure formed during initial render captures the snapshot value of count (0). Functional state updates always provide the most up-to-date state regardless of closure timing.'
    }
  ],

  'System Design & Distributed Systems': [
    {
      id: 'sd-1',
      scenario: 'Global Unique ID Generation at Scale',
      question: 'You need to generate 64-bit strictly collision-free, roughly time-ordered IDs across 200 distributed service nodes producing 200,000 IDs/sec without a centralized database bottleneck. What design should you use?',
      options: [
        { value: 'A', text: 'Centralized MySQL AUTO_INCREMENT column' },
        { value: 'B', text: 'Twitter Snowflake / Distributed 64-bit ID generator (timestamp + datacenter ID + machine ID + sequence number)' },
        { value: 'C', text: 'UUIDv4 completely random strings' },
        { value: 'D', text: 'Redis INCR command on a single master node' }
      ],
      correct: 'B',
      explanation: 'Snowflake-style IDs are 64-bit integers combining timestamp, worker node ID, and a local sequence counter, enabling distributed generation with zero network coordination.'
    },
    {
      id: 'sd-2',
      scenario: 'Cache Invalidation & Stampede Mitigation',
      question: 'A high-traffic news article cached in Redis expires under 50,000 requests/sec, causing all concurrent requests to miss and overwhelm the PostgreSQL database at the exact same instant (Cache Stampede). Which mechanism prevents this?',
      options: [
        { value: 'A', text: 'Delete the database whenever cache misses occur' },
        { value: 'B', text: 'Use Mutex / Distributed Locking (or probabilistic early expiration / background refresh) so only one worker queries the DB while others wait or serve stale data' },
        { value: 'C', text: 'Set cache TTL to 0 permanently' },
        { value: 'D', text: 'Reduce PostgreSQL connection pool limit to 1' }
      ],
      correct: 'B',
      explanation: 'Distributed locks (or XFetch probabilistic early recomputation) guarantee that only a single thread rebuilds the cache entry on expiration while all other requests receive stale data or await lock release.'
    },
    {
      id: 'sd-3',
      scenario: 'Idempotency in Distributed Payment Gateways',
      question: 'A user submits an order payment, but a network timeout occurs before the client receives the confirmation. If the client retries, how do you guarantee the customer is not charged twice?',
      options: [
        { value: 'A', text: 'Reject all retried HTTP requests permanently' },
        { value: 'B', text: 'Require an Idempotency-Key in the request header; check key existence in an atomic distributed store before processing and return original result on duplicate' },
        { value: 'C', text: 'Rely on the client browser cookies to detect payment count' },
        { value: 'D', text: 'Execute the transaction twice and issue an automated refund afterwards' }
      ],
      correct: 'B',
      explanation: 'Idempotency keys uniquely identify a transaction intent. Storing the key and payment state atomically ensures subsequent retries return the original confirmation without re-executing credit card charges.'
    },
    {
      id: 'sd-4',
      scenario: 'Eventual Consistency vs Distributed Quorums',
      question: 'In a distributed multi-replica database (replication factor N = 5), what condition must read quorum (R) and write quorum (W) satisfy to guarantee strong consistency (prevent stale reads)?',
      options: [
        { value: 'A', text: 'R + W <= N' },
        { value: 'B', text: 'R + W > N' },
        { value: 'C', text: 'R = 1 and W = 1 regardless of N' },
        { value: 'D', text: 'W must always equal 0' }
      ],
      correct: 'B',
      explanation: 'When R + W > N, the read set and write set must overlap by at least one node by the Pigeonhole Principle, guaranteeing that at least one replica in the read quorum has the latest write timestamp.'
    },
    {
      id: 'sd-5',
      scenario: 'Rate Limiting Across Microservice Clusters',
      question: 'You are deploying an API Gateway across 10 independent container instances. A user is limited to 100 requests per minute. How do you enforce this rate limit accurately across all 10 instances?',
      options: [
        { value: 'A', text: 'Store request counters in local in-memory RAM of each container independently' },
        { value: 'B', text: 'Use a centralized Redis cluster executing atomic Token Bucket / Sliding Window Log Lua scripts' },
        { value: 'C', text: 'Send an email to user after 100 requests' },
        { value: 'D', text: 'Route all traffic to a single container and shut down the other 9' }
      ],
      correct: 'B',
      explanation: 'A shared Redis store running an atomic Lua script guarantees that sliding window rate limiting is enforced globally across all containers without race conditions.'
    }
  ],

  'Python Programming': [
    {
      id: 'py-1',
      scenario: 'Processing a 50GB Log File Without Out-Of-Memory Crash',
      question: 'You must analyze error lines in a 50GB server log on a machine with only 4GB of RAM. What is the idiomatic, memory-efficient Python approach?',
      options: [
        { value: 'A', text: 'logs = open("file.log").read().split("\\n")' },
        { value: 'B', text: 'Iterate using a generator expression or file iterator (for line in file:) which streams lines lazily one at a time' },
        { value: 'C', text: 'Load the file into a global list variable' },
        { value: 'D', text: 'Duplicate the file into 50 separate JSON objects' }
      ],
      correct: 'B',
      explanation: 'Python file objects are iterable and stream line-by-line using buffered I/O, maintaining constant O(1) memory usage regardless of file size.'
    },
    {
      id: 'py-2',
      scenario: 'CPU-Bound Computation and the GIL',
      question: 'You have a CPU-heavy mathematical calculation (e.g. image processing). You spun up 8 Python threading.Thread instances on an 8-core machine, but total execution time did not decrease. Why, and what is the proper solution?',
      options: [
        { value: 'A', text: 'The Global Interpreter Lock (GIL) limits bytecode execution to a single thread; use multiprocessing.Pool or ProcessPoolExecutor instead' },
        { value: 'B', text: 'Threading only works on Windows' },
        { value: 'C', text: 'CPU cores are damaged' },
        { value: 'D', text: 'Increase the number of threads from 8 to 800' }
      ],
      correct: 'A',
      explanation: 'CPython’s GIL prevents multiple native threads from executing Python bytecode simultaneously. For CPU-bound work, multiprocessing creates separate processes with independent memory and GILs.'
    },
    {
      id: 'py-3',
      scenario: 'Mutable Default Argument Bug',
      question: 'Consider: def append_item(item, target_list=[]): target_list.append(item); return target_list. Calling append_item(1) then append_item(2) returns [1, 2] instead of [2]. Why does this happen and how is it corrected?',
      options: [
        { value: 'A', text: 'Default arguments are evaluated once at function definition time; fix by setting default to None and initializing target_list = [] inside' },
        { value: 'B', text: 'Python does not support list appending' },
        { value: 'C', text: 'The list was declared outside the module' },
        { value: 'D', text: 'The garbage collector is corrupted' }
      ],
      correct: 'A',
      explanation: 'Default arguments are evaluated once when the function is parsed. The same list object is mutated on each invocation. Setting default to None and checking `if target_list is None:` ensures a fresh list each call.'
    },
    {
      id: 'py-4',
      scenario: 'Writing Telemetry Decorators',
      question: 'You write a decorator to measure function execution latency. After decorating a function, help(func) and func.__name__ return "wrapper" instead of the original function name and docstring. How do you preserve original function metadata?',
      options: [
        { value: 'A', text: 'Set func.__name__ = "original" manually' },
        { value: 'B', text: 'Apply @functools.wraps(func) to the wrapper function definition' },
        { value: 'C', text: 'Avoid using functions in decorators' },
        { value: 'D', text: 'Compile the function with Cython' }
      ],
      correct: 'B',
      explanation: '@functools.wraps copies the original function’s __name__, __doc__, and other metadata to the wrapper, ensuring introspection and debugging tools function as expected.'
    },
    {
      id: 'py-5',
      scenario: 'Asynchronous Concurrency with Error Handling',
      question: 'In an asyncio web crawler running 100 concurrent tasks with asyncio.gather, if task #12 throws a network exception, the default gather behavior cancels or fails the entire batch. How do you collect results and individual exceptions without aborting?',
      options: [
        { value: 'A', text: 'Set return_exceptions=True in asyncio.gather, then inspect each result with isinstance(r, Exception)' },
        { value: 'B', text: 'Run all tasks in synchronous time.sleep loops' },
        { value: 'C', text: 'Disable error raising in Python runtime' },
        { value: 'D', text: 'Wrap the entire program in a blank except block' }
      ],
      correct: 'A',
      explanation: 'Setting return_exceptions=True prevents one failed coroutine from aborting the others, returning the exception instance as a value in the result list.'
    }
  ],

  'Cloud Computing (AWS/GCP)': [
    {
      id: 'cloud-1',
      scenario: 'Zero-Downtime Multi-AZ Architecture',
      question: 'You are designing a web service that must withstand an entire AWS Availability Zone (AZ) data center outage with zero downtime. Which architectural design is mandatory?',
      options: [
        { value: 'A', text: 'Deploying a single giant EC2 instance in us-east-1a' },
        { value: 'B', text: 'Multi-AZ Application Load Balancer distributing traffic across Auto Scaling instances in at least 2 distinct AZs, backed by Multi-AZ Aurora DB' },
        { value: 'C', text: 'Manual DNS failover pointing to an on-premise server' },
        { value: 'D', text: 'Storing database files in local instance store SSDs' }
      ],
      correct: 'B',
      explanation: 'Multi-AZ deployments ensure that if an entire physical facility loses power or connectivity, traffic immediately routes to healthy AZ instances with automated database standby promotion.'
    },
    {
      id: 'cloud-2',
      scenario: 'Secure Secret Management & IAM Least Privilege',
      question: 'An application running inside an EKS Kubernetes pod needs to write files to an Amazon S3 bucket. How should it authenticate securely without storing static AWS access keys in git or container images?',
      options: [
        { value: 'A', text: 'Hardcode AWS_SECRET_ACCESS_KEY in Dockerfile environment variables' },
        { value: 'B', text: 'Use IAM Roles for Service Accounts (IRSA) with OIDC token projection, granting short-lived least-privilege credentials' },
        { value: 'C', text: 'Make the S3 bucket completely public with public write permissions' },
        { value: 'D', text: 'Embed credentials in client HTML tags' }
      ],
      correct: 'B',
      explanation: 'IRSA leverages Kubernetes ServiceAccounts and AWS STS OIDC federation to issue temporary, rotating credentials directly to pod containers without any static secrets.'
    },
    {
      id: 'cloud-3',
      scenario: 'Minimizing Global Latency & Bandwidth Costs',
      question: 'A SaaS platform serves large images and video assets to users in Tokyo, London, and San Francisco from an S3 bucket in Mumbai. Users in London report slow 800ms download speeds. What is the most cost-effective architectural fix?',
      options: [
        { value: 'A', text: 'Deploy Amazon CloudFront CDN with edge caching locations worldwide' },
        { value: 'B', text: 'Migrate the entire backend to London' },
        { value: 'C', text: 'Increase Mumbai EC2 instance RAM to 1TB' },
        { value: 'D', text: 'Ask users to run downloads in off-peak hours' }
      ],
      correct: 'A',
      explanation: 'CloudFront caches static objects at 400+ Points of Presence (PoPs) globally, terminating TLS connections close to the user and serving cached content with single-digit millisecond latency.'
    },
    {
      id: 'cloud-4',
      scenario: 'Database Read Overload & Connection Saturation',
      question: 'During a flash sale, a relational database reaches 100% CPU utilization due to a 20:1 read-to-write ratio. Writes cannot be delayed, but queries are timing out. What is the recommended managed cloud architecture?',
      options: [
        { value: 'A', text: 'Provision Read Replicas with RDS Proxy to handle connection pooling and offload read queries' },
        { value: 'B', text: 'Drop all indexes to save storage' },
        { value: 'C', text: 'Restart the database instance during the flash sale' },
        { value: 'D', text: 'Disable database transaction logging' }
      ],
      correct: 'A',
      explanation: 'Read replicas allow read queries to be distributed across horizontally scaled replicas, while RDS Proxy pools idle connections to prevent connection exhaustion.'
    },
    {
      id: 'cloud-5',
      scenario: 'Disaster Recovery RTO / RPO Optimization',
      question: 'A financial institution mandates a Recovery Point Objective (RPO) of < 1 minute and Recovery Time Objective (RTO) of < 5 minutes for their cloud infrastructure in case of an entire region failure. What strategy meets this requirement?',
      options: [
        { value: 'A', text: 'Backup and Restore from tape archives once a month' },
        { value: 'B', text: 'Multi-Region Active-Active deployment with asynchronous cross-region data replication (e.g. Aurora Global Database)' },
        { value: 'C', text: 'Cold standby with manual Terraform runs initiated the next day' },
        { value: 'D', text: 'Exporting CSV files to local USB drives' }
      ],
      correct: 'B',
      explanation: 'Aurora Global Database replicates writes cross-region with typical latency of under 1 second (RPO < 1 min) and can be promoted to standalone read/write cluster in under 1 minute (RTO < 5 min).'
    }
  ]
};

// Fallback generator for skills that don't have hardcoded bank
export const getQuestionsForSkill = (skillName) => {
  if (SKILL_TEST_BANKS[skillName]) {
    return SKILL_TEST_BANKS[skillName];
  }

  // Parameterized high-quality engineering scenario questions for any other skill
  return [
    {
      id: `${skillName}-1`,
      scenario: `Production Implementation: ${skillName}`,
      question: `When implementing ${skillName} in a high-scale production system, what is the primary operational trade-off that senior engineers must benchmark first?`,
      options: [
        { value: 'A', text: 'Color scheme and visual theme integration' },
        { value: 'B', text: 'Throughput capacity vs latency under high concurrency and fault conditions' },
        { value: 'C', text: 'Disabling all monitoring alerts to reduce network overhead' },
        { value: 'D', text: 'Using untyped variable definitions everywhere' }
      ],
      correct: 'B',
      explanation: `In production engineering for ${skillName}, throughput vs latency and graceful degradation under load represent the primary architectural trade-offs.`
    },
    {
      id: `${skillName}-2`,
      scenario: `Fault Tolerance & Edge Cases: ${skillName}`,
      question: `Which failure mode is most commonly encountered when scaling ${skillName} horizontally across distributed workers?`,
      options: [
        { value: 'A', text: 'Resource contention, network partitioning, and race conditions' },
        { value: 'B', text: 'Excessive whitespace in code comments' },
        { value: 'C', text: 'The operating system disabling hardware timers' },
        { value: 'D', text: 'Zero memory consumption' }
      ],
      correct: 'A',
      explanation: `Horizontal scaling introduces network unpredictability, shared resource contention, and synchronization challenges that require robust design.`
    },
    {
      id: `${skillName}-3`,
      scenario: `Architecture Standards: ${skillName}`,
      question: `What industry standard practice ensures ${skillName} remains maintainable and testable over long-term project lifecycles?`,
      options: [
        { value: 'A', text: 'Writing all logic in a single 10,000 line script' },
        { value: 'B', text: 'Modular decoupling, automated CI regression suites, and clear interface contracts' },
        { value: 'C', text: 'Bypassing code reviews to accelerate deployment' },
        { value: 'D', text: 'Hardcoding environment IP addresses' }
      ],
      correct: 'B',
      explanation: `Decoupled modular design and automated regression test contracts prevent regressions and ensure system longevity.`
    },
    {
      id: `${skillName}-4`,
      scenario: `Performance Optimization: ${skillName}`,
      question: `When profiling ${skillName} bottlenecks, what diagnostic methodology produces the most actionable performance insights?`,
      options: [
        { value: 'A', text: 'Randomly changing configuration values until it feels faster' },
        { value: 'B', text: 'Flamegraphs, p95/p99 latency distribution analysis, and CPU/memory profiling' },
        { value: 'C', text: 'Restarting the computer repeatedly' },
        { value: 'D', text: 'Disabling compiler optimizations' }
      ],
      correct: 'B',
      explanation: `Flamegraphs and percentile latency metrics (p95/p99) reveal the exact code paths and system calls consuming resources.`
    },
    {
      id: `${skillName}-5`,
      scenario: `Security & Compliance: ${skillName}`,
      question: `In modern secure development lifecycles, how should security controls for ${skillName} be enforced?`,
      options: [
        { value: 'A', text: 'Automated dependency vulnerability scanning, principle of least privilege, and input sanitization' },
        { value: 'B', text: 'Relying solely on external firewall perimeters without internal authorization' },
        { value: 'C', text: 'Using default admin passwords for convenience' },
        { value: 'D', text: 'Disabling HTTPS/TLS to speed up traffic' }
      ],
      correct: 'A',
      explanation: `Zero-trust principles require automated scanning, least-privilege access, and strict input validation at every layer.`
    }
  ];
};
