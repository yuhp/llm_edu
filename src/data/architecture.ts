import { Stage } from '../types';

export const stagesEn: Stage[] = [
  {
    id: 'stage-1',
    title: 'Stage 1: Single LLM Call',
    subtitle: 'Foundation: Passive QA',
    description: 'The application simply forwards a prompt to the model and returns the response. The model relies only on its training-time knowledge.',
    highlights: [
      'Stateless one-shot interaction',
      'Bounded by knowledge cutoff',
      'No external tool execution',
      'Best for simple question answering'
    ],
    nodes: [
      { id: 'user', type: 'user', label: 'User', x: 25, y: 50 },
      { id: 'llm', type: 'llm', label: 'LLM Model', x: 75, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'llm', label: '1. Prompt / Question', sequence: 1 },
      { id: 'f2', from: 'llm', to: 'user', label: '2. Text Response', sequence: 2 }
    ]
  },
  {
    id: 'stage-2',
    title: 'Stage 2: Tool Calling',
    subtitle: 'Dynamic execution with external knowledge',
    description: 'The model proposes a tool call, while the application executes the tool and injects the result back for grounded synthesis.',
    highlights: [
      'LLM only proposes tool-call intent',
      'Client validates and executes tools',
      'Tool results are injected back as context',
      'Still mostly a linear request-response loop'
    ],
    nodes: [
      { id: 'user', type: 'user', label: 'User', x: 15, y: 50 },
      { id: 'app', type: 'manager', label: 'Tool Orchestrator', x: 50, y: 50 },
      { id: 'tools', type: 'tool', label: 'External Tools / APIs', x: 50, y: 15 },
      { id: 'llm', type: 'llm', label: 'LLM Engine', x: 85, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'app', label: '1. User Query', sequence: 1 },
      { id: 'f2', from: 'app', to: 'llm', label: '2. Forward Query', sequence: 2 },
      { id: 'f3', from: 'llm', to: 'app', label: '3. Tool Call Intent', sequence: 3 },
      { id: 'f4', from: 'app', to: 'tools', label: '4. Execute Tool', sequence: 4 },
      { id: 'f5', from: 'tools', to: 'app', label: '5. Return Result', sequence: 5, dotted: true },
      { id: 'f6', from: 'app', to: 'llm', label: '6. Inject Context', sequence: 6 },
      { id: 'f7', from: 'llm', to: 'app', label: '7. Synthesis', sequence: 7 },
      { id: 'f8', from: 'app', to: 'user', label: '8. Final Output', sequence: 8 }
    ]
  },
  {
    id: 'stage-3',
    title: 'Stage 3: Autonomous Agent',
    subtitle: 'Persona + tool loop',
    description: 'The client orchestrates an iterative loop in which the model can read skill instructions, take actions, observe outcomes, and continue until completion.',
    highlights: [
      'Persona and workflow are encoded in prompts',
      'Skill docs teach reusable operating rules',
      'Client owns execution, memory, and safety boundaries',
      'Observation loops enable autonomous completion'
    ],
    nodes: [
      { id: 'user', type: 'user', label: 'User', x: 12, y: 50 },
      { id: 'agent_def', type: 'agent', label: 'Persona', x: 38, y: 15 },
      { id: 'app', type: 'manager', label: 'Agent Loop Orchestrator', x: 38, y: 50 },
      { id: 'memory', type: 'db', label: 'State Memory', x: 38, y: 85 },
      { id: 'skills', type: 'tool', label: 'Skill List / Docs', x: 75, y: 15 },
      { id: 'tools', type: 'tool', label: 'Action APIs', x: 75, y: 50 },
      { id: 'llm', type: 'llm', label: 'LLM Engine', x: 75, y: 85 }
    ],
    flows: [
      { id: 'f1', from: 'agent_def', to: 'app', label: '1. Init Persona', sequence: 1 },
      { id: 'f2', from: 'user', to: 'app', label: '2. Task Request', sequence: 2 },
      { id: 'f3', from: 'app', to: 'llm', label: '3. Prompt Context', sequence: 3 },
      { id: 'f4', from: 'llm', to: 'app', label: '4. Select Skill', sequence: 4 },
      { id: 'f5', from: 'app', to: 'skills', label: '5. Fetch Skill Doc', sequence: 5 },
      { id: 'f6', from: 'skills', to: 'app', label: 'Rules', sequence: 5, dotted: true },
      { id: 'f7', from: 'app', to: 'llm', label: '6. Inject Rules', sequence: 6 },
      { id: 'f8', from: 'llm', to: 'app', label: '7. Execute Action', sequence: 7 },
      { id: 'f9', from: 'app', to: 'tools', label: '8. Run Tools', sequence: 8 },
      { id: 'f10', from: 'tools', to: 'app', label: 'Result', sequence: 8, dotted: true },
      { id: 'f11', from: 'app', to: 'memory', label: 'Save State', sequence: 8, dotted: true },
      { id: 'f12', from: 'app', to: 'llm', label: '9. Observation', sequence: 9 },
      { id: 'f13', from: 'llm', to: 'app', label: '10. Final Answer', sequence: 10 },
      { id: 'f14', from: 'app', to: 'user', label: '11. Deliverable', sequence: 11 }
    ]
  },
  {
    id: 'stage-4',
    title: 'Stage 4: Multi-Agent System',
    subtitle: 'Specialization and feedback loops',
    description: 'Several specialized agents collaborate through delegation, review, and routing so complex workflows can be completed with higher reliability.',
    highlights: [
      'Specialized roles improve quality',
      'Peer review strengthens robustness',
      'Routing supports parallel work',
      'Closer to enterprise delivery pipelines'
    ],
    nodes: [
      { id: 'user', type: 'user', label: 'User', x: 12, y: 50 },
      { id: 'router', type: 'manager', label: 'Agent Router', x: 38, y: 50 },
      { id: 'researcher', type: 'agent', label: 'Researcher', x: 64, y: 15 },
      { id: 'coder', type: 'agent', label: 'Execution Agent', x: 64, y: 50 },
      { id: 'reviewer', type: 'agent', label: 'Reviewer', x: 64, y: 85 },
      { id: 'tools', type: 'tool', label: 'Workspace / Web', x: 88, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'router', label: '1. Complex Objective', sequence: 1 },
      { id: 'f2', from: 'router', to: 'researcher', label: '2. Delegate Research', sequence: 2 },
      { id: 'f3', from: 'researcher', to: 'tools', label: '3. Search Tools', sequence: 3 },
      { id: 'f4', from: 'tools', to: 'researcher', label: 'Data', sequence: 3, dotted: true },
      { id: 'f5', from: 'researcher', to: 'coder', label: '4. Handoff Context', sequence: 4 },
      { id: 'f6', from: 'coder', to: 'tools', label: '5. Execute Work', sequence: 5 },
      { id: 'f7', from: 'coder', to: 'reviewer', label: '6. Request Review', sequence: 6 },
      { id: 'f8', from: 'reviewer', to: 'tools', label: '7. Run Tests', sequence: 7 },
      { id: 'f9', from: 'reviewer', to: 'coder', label: '8. Feedback Loop', sequence: 8, dotted: true },
      { id: 'f10', from: 'coder', to: 'router', label: '9. Final Deliverable', sequence: 9 },
      { id: 'f11', from: 'router', to: 'user', label: '10. Completed Task', sequence: 10 }
    ]
  }
];

export const stagesZh: Stage[] = [
  {
    id: 'stage-1',
    title: '阶段 1: 单体 LLM 调用',
    subtitle: '基础形态：被动问答',
    description: '应用只负责把提示词发给模型，再把结果返回给用户。模型完全依赖训练时内化的知识。',
    highlights: [
      '单轮、无状态交互',
      '受训练知识截止时间限制',
      '不会主动使用外部工具',
      '适合简单问答场景'
    ],
    nodes: [
      { id: 'user', type: 'user', label: '用户', x: 25, y: 50 },
      { id: 'llm', type: 'llm', label: 'LLM 模型', x: 75, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'llm', label: '1. 输入问题', sequence: 1 },
      { id: 'f2', from: 'llm', to: 'user', label: '2. 返回文本', sequence: 2 }
    ]
  },
  {
    id: 'stage-2',
    title: '阶段 2: 工具调用',
    subtitle: '引入外部知识与动态执行',
    description: '模型提出工具调用意图，应用负责真实执行工具，再把执行结果注入给模型完成更可靠的回答。',
    highlights: [
      'LLM 只提出工具调用意图',
      'Client 负责校验并执行工具',
      '工具结果作为上下文回填',
      '整体仍偏线性请求-响应循环'
    ],
    nodes: [
      { id: 'user', type: 'user', label: '用户', x: 15, y: 50 },
      { id: 'app', type: 'manager', label: '工具编排器', x: 50, y: 50 },
      { id: 'tools', type: 'tool', label: '外部工具 / API', x: 50, y: 15 },
      { id: 'llm', type: 'llm', label: 'LLM 引擎', x: 85, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'app', label: '1. 用户请求', sequence: 1 },
      { id: 'f2', from: 'app', to: 'llm', label: '2. 转发问题', sequence: 2 },
      { id: 'f3', from: 'llm', to: 'app', label: '3. 工具调用意图', sequence: 3 },
      { id: 'f4', from: 'app', to: 'tools', label: '4. 执行工具', sequence: 4 },
      { id: 'f5', from: 'tools', to: 'app', label: '5. 返回结果', sequence: 5, dotted: true },
      { id: 'f6', from: 'app', to: 'llm', label: '6. 注入上下文', sequence: 6 },
      { id: 'f7', from: 'llm', to: 'app', label: '7. 综合回答', sequence: 7 },
      { id: 'f8', from: 'app', to: 'user', label: '8. 最终输出', sequence: 8 }
    ]
  },
  {
    id: 'stage-3',
    title: '阶段 3: 自主智能体',
    subtitle: '人设 + 工具循环',
    description: '客户端驱动一个可迭代闭环：模型可以读取技能规范、触发动作、观察结果，并持续推进直到完成目标。',
    highlights: [
      '人设与工作方式通过提示词编码',
      'Skill 文档沉淀可复用规则',
      'Client 持有执行、记忆与安全边界',
      '观测反馈循环带来自主完成能力'
    ],
    nodes: [
      { id: 'user', type: 'user', label: '用户', x: 12, y: 50 },
      { id: 'agent_def', type: 'agent', label: '人设定义', x: 38, y: 15 },
      { id: 'app', type: 'manager', label: 'Agent 闭环编排器', x: 38, y: 50 },
      { id: 'memory', type: 'db', label: '状态记忆', x: 38, y: 85 },
      { id: 'skills', type: 'tool', label: 'Skill 列表 / 文档', x: 75, y: 15 },
      { id: 'tools', type: 'tool', label: '执行工具', x: 75, y: 50 },
      { id: 'llm', type: 'llm', label: 'LLM 引擎', x: 75, y: 85 }
    ],
    flows: [
      { id: 'f1', from: 'agent_def', to: 'app', label: '1. 加载人设', sequence: 1 },
      { id: 'f2', from: 'user', to: 'app', label: '2. 接收任务', sequence: 2 },
      { id: 'f3', from: 'app', to: 'llm', label: '3. 注入上下文', sequence: 3 },
      { id: 'f4', from: 'llm', to: 'app', label: '4. 选择 Skill', sequence: 4 },
      { id: 'f5', from: 'app', to: 'skills', label: '5. 读取 Skill 文档', sequence: 5 },
      { id: 'f6', from: 'skills', to: 'app', label: '返回规则', sequence: 5, dotted: true },
      { id: 'f7', from: 'app', to: 'llm', label: '6. 补充规范', sequence: 6 },
      { id: 'f8', from: 'llm', to: 'app', label: '7. 请求执行', sequence: 7 },
      { id: 'f9', from: 'app', to: 'tools', label: '8. 调用工具', sequence: 8 },
      { id: 'f10', from: 'tools', to: 'app', label: '执行结果', sequence: 8, dotted: true },
      { id: 'f11', from: 'app', to: 'memory', label: '同步状态', sequence: 8, dotted: true },
      { id: 'f12', from: 'app', to: 'llm', label: '9. 观测反馈', sequence: 9 },
      { id: 'f13', from: 'llm', to: 'app', label: '10. 最终答复', sequence: 10 },
      { id: 'f14', from: 'app', to: 'user', label: '11. 交付结果', sequence: 11 }
    ]
  },
  {
    id: 'stage-4',
    title: '阶段 4: 多智能体系统',
    subtitle: '专业分工与反馈闭环',
    description: '多个专业智能体通过委派、审查、路由协作，从而以更高鲁棒性完成复杂工作流。',
    highlights: [
      '专业角色拆分提升质量',
      '同行审查增强鲁棒性',
      '动态路由支持并行协作',
      '更接近企业级交付流水线'
    ],
    nodes: [
      { id: 'user', type: 'user', label: '用户', x: 12, y: 50 },
      { id: 'router', type: 'manager', label: 'Agent 路由器', x: 38, y: 50 },
      { id: 'researcher', type: 'agent', label: '研究 Agent', x: 64, y: 15 },
      { id: 'coder', type: 'agent', label: '执行 Agent', x: 64, y: 50 },
      { id: 'reviewer', type: 'agent', label: '审查 Agent', x: 64, y: 85 },
      { id: 'tools', type: 'tool', label: '工作区 / 网络', x: 88, y: 50 }
    ],
    flows: [
      { id: 'f1', from: 'user', to: 'router', label: '1. 复杂目标', sequence: 1 },
      { id: 'f2', from: 'router', to: 'researcher', label: '2. 委派调研', sequence: 2 },
      { id: 'f3', from: 'researcher', to: 'tools', label: '3. 搜索工具', sequence: 3 },
      { id: 'f4', from: 'tools', to: 'researcher', label: '数据返回', sequence: 3, dotted: true },
      { id: 'f5', from: 'researcher', to: 'coder', label: '4. 交接上下文', sequence: 4 },
      { id: 'f6', from: 'coder', to: 'tools', label: '5. 执行工作', sequence: 5 },
      { id: 'f7', from: 'coder', to: 'reviewer', label: '6. 发起审查', sequence: 6 },
      { id: 'f8', from: 'reviewer', to: 'tools', label: '7. 运行测试', sequence: 7 },
      { id: 'f9', from: 'reviewer', to: 'coder', label: '8. 反馈回路', sequence: 8, dotted: true },
      { id: 'f10', from: 'coder', to: 'router', label: '9. 最终交付', sequence: 9 },
      { id: 'f11', from: 'router', to: 'user', label: '10. 任务完成', sequence: 10 }
    ]
  }
];
