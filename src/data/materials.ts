export interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  facultyId: string;
  content: string;
  author: string;
  dateAdded: string;
}

export const studyMaterials: StudyMaterial[] = [
  // Engineering Materials
  {
    id: 'eng-1',
    title: 'Introduction to Mechanical Engineering',
    description: 'Fundamental concepts of mechanics and machine design',
    facultyId: 'engineering',
    content: `# Introduction to Mechanical Engineering

Mechanical engineering is a diverse field that applies principles of physics, mathematics, and materials science to design, analyze, manufacture, and maintain mechanical systems.

## Key Concepts

### 1. Statics and Dynamics
- **Statics**: Study of forces in equilibrium
- **Dynamics**: Study of forces and motion

### 2. Thermodynamics
- Heat transfer
- Energy conversion
- Entropy and the laws of thermodynamics

### 3. Materials Science
- Material properties
- Stress and strain
- Failure analysis

## Applications
Mechanical engineers work on:
- Automotive systems
- Aerospace technology
- Robotics
- Manufacturing processes
- HVAC systems`,
    author: 'Dr. John Smith',
    dateAdded: '2024-01-15'
  },
  {
    id: 'eng-2',
    title: 'Digital Electronics Fundamentals',
    description: 'Understanding logic gates and digital circuits',
    facultyId: 'engineering',
    content: `# Digital Electronics Fundamentals

Digital electronics form the foundation of modern computing and communication systems.

## Binary Number System
- Bits and bytes
- Binary arithmetic
- Number conversion

## Logic Gates
- AND, OR, NOT gates
- NAND and NOR gates
- XOR and XNOR gates

## Combinational Logic
- Adders and subtractors
- Multiplexers and decoders
- Encoders

## Sequential Logic
- Flip-flops
- Counters
- Registers`,
    author: 'Prof. Sarah Johnson',
    dateAdded: '2024-01-20'
  },

  // Science Materials
  {
    id: 'sci-1',
    title: 'Organic Chemistry Basics',
    description: 'Introduction to carbon compounds and reactions',
    facultyId: 'science',
    content: `# Organic Chemistry Basics

Organic chemistry is the study of carbon-containing compounds and their properties.

## Carbon Bonding
- Covalent bonds
- Hybridization (sp, sp2, sp3)
- Sigma and pi bonds

## Functional Groups
- Alkanes, alkenes, alkynes
- Alcohols and ethers
- Aldehydes and ketones
- Carboxylic acids and esters

## Organic Reactions
- Substitution reactions
- Addition reactions
- Elimination reactions
- Oxidation-reduction reactions`,
    author: 'Dr. Michael Brown',
    dateAdded: '2024-02-01'
  },
  {
    id: 'sci-2',
    title: 'Cellular Biology Overview',
    description: 'Understanding cell structure and function',
    facultyId: 'science',
    content: `# Cellular Biology Overview

Cells are the basic building blocks of all living organisms.

## Cell Structure
- Cell membrane
- Cytoplasm
- Nucleus
- Mitochondria
- Endoplasmic reticulum
- Golgi apparatus

## Cell Functions
- Protein synthesis
- Energy production
- Cell division
- Transport mechanisms

## DNA and Genetics
- DNA structure
- RNA transcription
- Protein translation
- Gene expression`,
    author: 'Dr. Emily Davis',
    dateAdded: '2024-02-05'
  },

  // Arts Materials
  {
    id: 'arts-1',
    title: 'Introduction to Literature',
    description: 'Exploring major literary works and movements',
    facultyId: 'arts',
    content: `# Introduction to Literature

Literature encompasses written works of artistic merit, including fiction, poetry, and drama.

## Literary Genres
- Fiction (novels, short stories)
- Poetry
- Drama
- Non-fiction

## Major Literary Movements
- Romanticism
- Modernism
- Postmodernism
- Contemporary literature

## Literary Analysis
- Themes and motifs
- Character development
- Symbolism and metaphor
- Narrative structure`,
    author: 'Prof. Robert Wilson',
    dateAdded: '2024-02-10'
  },
  {
    id: 'arts-2',
    title: 'Art History: Renaissance to Modern',
    description: 'Survey of major art movements and artists',
    facultyId: 'arts',
    content: `# Art History: Renaissance to Modern

A journey through the major periods of Western art history.

## Renaissance (14th-17th Century)
- Leonardo da Vinci
- Michelangelo
- Raphael
- Humanism and perspective

## Baroque (17th Century)
- Caravaggio
- Rembrandt
- Dramatic lighting and emotion

## Impressionism (19th Century)
- Monet
- Renoir
- Light and color

## Modern Art (20th Century)
- Picasso
- Kandinsky
- Abstract expressionism`,
    author: 'Dr. Lisa Anderson',
    dateAdded: '2024-02-15'
  },

  // Social Sciences Materials
  {
    id: 'soc-1',
    title: 'Introduction to Psychology',
    description: 'Understanding human behavior and mental processes',
    facultyId: 'social-sciences',
    content: `# Introduction to Psychology

Psychology is the scientific study of behavior and mental processes.

## Major Perspectives
- Biological perspective
- Cognitive perspective
- Behavioral perspective
- Psychodynamic perspective

## Key Areas.
- Developmental psychology
- Social psychology
- Clinical psychology
- Cognitive psychology

## Research Methods
- Experiments
- Observational studies
- Surveys
- Case studies`,
    author: 'Dr. James Taylor',
    dateAdded: '2024-02-20'
  },
  {
    id: 'soc-2',
    title: 'Economics Principles',
    description: 'Fundamental concepts of micro and macro economics',
    facultyId: 'social-sciences',
    content: `# Economics Principles

Economics studies how societies allocate scarce resources.

## Microeconomics
- Supply and demand
- Market equilibrium
- Consumer behavior
- Production costs

## Macroeconomics
- GDP and economic growth
- Inflation and unemployment
- Fiscal policy
- Monetary policy

## Economic Systems
- Capitalism
- Socialism
- Mixed economies`,
    author: 'Prof. Maria Garcia',
    dateAdded: '2024-02-25'
  },

  // Education Materials
  {
    id: 'edu-1',
    title: 'Educational Psychology',
    description: 'Learning theories and their applications',
    facultyId: 'education',
    content: `# Educational Psychology

Educational psychology applies psychological principles to education.

## Learning Theories
- Behaviorism (Skinner, Pavlov)
- Cognitive theory (Piaget)
- Social learning theory (Bandura)
- Constructivism (Vygotsky)

## Motivation
- Intrinsic vs extrinsic motivation
- Self-determination theory
- Goal-setting theory

## Assessment
- Formative assessment
- Summative assessment
- Standardized testing
- Alternative assessment methods`,
    author: 'Dr. Patricia Martinez',
    dateAdded: '2024-03-01'
  },
  {
    id: 'edu-2',
    title: 'Curriculum Development',
    description: 'Designing effective educational curricula',
    facultyId: 'education',
    content: `# Curriculum Development

Curriculum development involves planning, implementing, and evaluating educational programs.

## Curriculum Models
- Tyler model
- Taba model
- Understanding by Design (UbD)

## Curriculum Components
- Goals and objectives
- Content selection
- Learning activities
- Assessment methods

## Curriculum Design Principles
- Alignment with standards
- Student-centered approach
- Differentiated instruction
- Inclusive education`,
    author: 'Prof. David Lee',
    dateAdded: '2024-03-05'
  }
];
