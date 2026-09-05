export interface Faculty {
  id: string;
  name: string;
  description: string;
}

export const faculties: Faculty[] = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering',
    description: 'Building the future through innovation and technology'
  },
  {
    id: 'science',
    name: 'Faculty of Science',
    description: 'Exploring the mysteries of the natural world'
  },
  {
    id: 'arts',
    name: 'Faculty of Arts',
    description: 'Nurturing creativity and human expression'
  },
  {
    id: 'social-sciences',
    name: 'Faculty of Social Sciences',
    description: 'Understanding society and human behavior'
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    description: 'Shaping the minds of tomorrow'
  }
];
