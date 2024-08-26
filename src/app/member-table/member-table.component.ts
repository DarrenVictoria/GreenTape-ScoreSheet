import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

interface Question {
  id: string;
  weight: number;
}

interface Section {
  name: string;
  sectionWeight: number;
  questions: Question[];
}

interface Category {
  name: string;
  sections: Section[];
}

interface SupplierData {
  answers: { [questionId: string]: string };
  scores: { [questionId: string]: number };
  categoryScore: number;
  sectionScore: number;
}

interface Supplier {
  name: string;
  expanded: boolean;
  scorePercentage: string;
  data: SupplierData[];
}

interface Member {
  name: string;
  categories: Category[];
  suppliers: Supplier[];
}

interface Response {
  name: string;
  datetime: string;
  shortlisted?: boolean;
  committeeText: string;
  comment: string;
  score: number; // Add this line
}

interface Company {
  name: string;
  members: {
    committeeResponses?: Response[];
    nomineeResponses?: Response[];
    shortlistCommitteeResponses?: Response[];
    shortlistNomineeResponses?: Response[];
    preawardCommitteeResponses?: Response[];
    preawardNomineeResponses?: Response[];
  };
}

interface Committee {
  name: string;
  members: Member[];
  responses: {
    shortlist: Company[];
    preaward: Company[];
    allShortlistPreaward: Company[];
  };
}

@Component({
  selector: 'app-member-table',
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.css']
})
export class MemberTableComponent implements OnInit, AfterViewInit {
  @ViewChild('tableBody') tableBody: ElementRef;

  isPopupOpen: boolean = false;



  committees: Committee[] = [
    {
      name: 'Committee 1',
      members: [
        {
          name: 'Jack',
          categories: [
            {
              name: 'General',
              sections: [
                {
                  name: 'Approach and Methodology',
                  sectionWeight: 30,
                  questions: [
                    { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                    { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                  ]
                },
                {
                  name: 'Experience',
                  sectionWeight: 70,
                  questions: [
                    {
                      id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                    },
                    { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                  ]
                }
              ]
            },
            {
              name: 'Product',
              sections: [
                {
                  name: 'Financial',
                  sectionWeight: 20,
                  questions: [
                    {
                      id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                    },
                    { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                    { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                  ]
                },
                {
                  name: 'Technical',
                  sectionWeight: 20,
                  questions: [
                    { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                    { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                  ]
                },
                {
                  name: 'General',
                  sectionWeight: 60,
                  questions: [
                    {
                      id: 'What is your companies approach to quality control and assurance?', weight: 50
                    },
                    { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                    { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                  ]
                }
              ]
            }
          ],
          suppliers: [
            {
              name: 'Supplier 1',
              scorePercentage: '40%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
            {
              name: 'Supplier 2',
              scorePercentage: '70%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
            {
              name: 'Supplier 3',
              scorePercentage: '90%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
          ]
        },
        {
          name: 'Mark',
          categories: [
            {
              name: 'General',
              sections: [
                {
                  name: 'Approach and Methodology',
                  sectionWeight: 30,
                  questions: [
                    { id: 'How do you plan to manage and mitigate potential risks associated with this project?', weight: 50 },
                    { id: 'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?', weight: 50 }
                  ]
                },
                {
                  name: 'Experience',
                  sectionWeight: 70,
                  questions: [
                    {
                      id: 'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?', weight: 40
                    },
                    { id: 'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?', weight: 30 }
                  ]
                }
              ]
            },
            {
              name: 'Product',
              sections: [
                {
                  name: 'Financial',
                  sectionWeight: 20,
                  questions: [
                    {
                      id: 'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?', weight: 10
                    },
                    { id: 'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?', weight: 10 },
                    { id: 'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?', weight: 80 }
                  ]
                },
                {
                  name: 'Technical',
                  sectionWeight: 20,
                  questions: [
                    { id: 'What is your proposed timeline for project implementation, including key milestones and deliverables?', weight: 70 },
                    { id: 'How does your solution address scalability and future technological advancements?', weight: 30 }
                  ]
                },
                {
                  name: 'General',
                  sectionWeight: 60,
                  questions: [
                    {
                      id: 'What is your companies approach to quality control and assurance?', weight: 50
                    },
                    { id: 'Can you provide details on your supply chain management and logistics capabilities?', weight: 25 },
                    { id: 'How does your pricing structure compare to industry standards, and what value-added services do you offer?', weight: 25 }
                  ]
                }
              ]
            }
          ],
          suppliers: [
            {
              name: 'Supplier 1',
              scorePercentage: '40%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
            {
              name: 'Supplier 2',
              scorePercentage: '70%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
            {
              name: 'Supplier 3',
              scorePercentage: '90%',
              expanded: false,
              data: [
                {
                  answers: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 'We use a comprehensive risk management framework.',
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 'We employ Agile methodologies with regular sprints and quality checks.'
                  },
                  scores: {
                    'How do you plan to manage and mitigate potential risks associated with this project?': 8,
                    'What specific methodologies or frameworks will you use to ensure timely delivery and quality outcomes?': 7
                  },
                  categoryScore: 67.3,
                  sectionScore: 22.5
                },
                {
                  answers: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 'We have completed 3 similar projects in the last 5 years, all within budget and meeting all objectives.',
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 'Our team includes certified project managers and technical experts in the required fields.'
                  },
                  scores: {
                    'Can you provide detailed examples of similar projects you completed in the last 5 years, including scope, budget, and outcomes?': 9,
                    'How does your teams expertise align with the unique requirements of this project, and what specialized skills can you bring to ensure its success?': 8
                  },
                  categoryScore: 67.3,
                  sectionScore: 44.8
                },
                {
                  answers: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 'We have a dedicated risk management team and conduct regular audits.',
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 'Our fee structure is transparent with no hidden costs. We charge a flat rate plus performance bonuses.',
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 'We have successfully completed 5 similar projects in the past 3 years. Case studies are available upon request.'
                  },
                  scores: {
                    'What is your firms approach to risk management, and how do you ensure compliance with relevant financial regulations?': 7,
                    'Can you provide details on your fee structure, including any hidden costs or additional charges that may apply?': 8,
                    'What is your track record in handling projects similar to ours, and can you provide case studies or references from comparable clients?': 9
                  },
                  categoryScore: 76.3,
                  sectionScore: 15.8
                },
                {
                  answers: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 'We propose a 6-month timeline with monthly milestones and deliverables.',
                    'How does your solution address scalability and future technological advancements?': 'Our solution is built on a modular architecture allowing for easy scaling and integration of new technologies.'
                  },
                  scores: {
                    'What is your proposed timeline for project implementation, including key milestones and deliverables?': 8,
                    'How does your solution address scalability and future technological advancements?': 7
                  },
                  categoryScore: 76.3,
                  sectionScore: 17
                },
                {
                  answers: {
                    'What is your companies approach to quality control and assurance?': 'We have a dedicated QA team and use automated testing alongside manual checks.',
                    'Can you provide details on your supply chain management and logistics capabilities?': 'We use advanced supply chain management software and have partnerships with major logistics providers.',
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 'Our pricing is competitive with added services like 24/7 support and regular consultations.'
                  },
                  scores: {
                    'What is your companies approach to quality control and assurance?': 9,
                    'Can you provide details on your supply chain management and logistics capabilities?': 7,
                    'How does your pricing structure compare to industry standards, and what value-added services do you offer?': 8
                  },
                  categoryScore: 76.3,
                  sectionScore: 43.5
                }
              ]
            },
          ]
        },
      ],
      responses: {
        shortlist: [
          {
            name: "Jeny pvt ltd",
            members: {
              committeeResponses: [
                {
                  name: "Tharika",
                  datetime: "23/08/2024 01:39:34 PM",
                  shortlisted: true,
                  committeeText: "Shortlist committee one",
                  comment: '"IT" redirects here. For the customer service colloquially referred to as IT, see Tech support. For other uses, see It (disambiguation).\n\n"Infotech" redirects here. For the Indian company, see Cyient.\n\nFor the Hong Kong constituency, see Information Technology (constituency).',
                  score: 85 // Add score
                },
                {
                  name: "John",
                  datetime: "23/08/2024 01:39:34 PM",
                  shortlisted: true,
                  committeeText: "Shortlist committee one",
                  comment: '"IT" redirects here. For the customer service colloquially referred to as IT, see Tech support. For other uses, see It (disambiguation).\n\n"Infotech" redirects here. For the Indian company, see Cyient.\n\nFor the Hong Kong constituency, see Information Technology (constituency).',
                  score: 45 // Add score
                }
              ],
              nomineeResponses: [
                {
                  name: "Dilruwan",
                  datetime: "23/08/2024 01:45:40 PM",
                  shortlisted: false,
                  committeeText: "Shortlist Nominee",
                  comment: '"IT" redirects here. For the customer service colloquially referred to as IT, see Tech support. For other uses, see It (disambiguation).\n\n"Infotech" redirects here. For the Indian company, see Cyient.\n\nFor the Hong Kong constituency, see Information Technology (constituency).',
                  score: 70 // Add score
                }
              ]
            }
          }
        ],
        preaward: [
          {
            name: "Jeny pvt ltd",
            members: {
              committeeResponses: [
                {
                  name: "Dilruwan",
                  datetime: "23/08/2024 01:45:15 PM",
                  committeeText: "Pre award committee 1",
                  comment: "Although humans have been storing, retrieving, manipulating, and communicating information since the earliest writing systems were developed, the term information technology in its modern sense first appeared in a 1958 article published in the Harvard Business Review; authors Harold J. Leavitt and Thomas L. Whisler commented that",
                  score: 88 // Add score
                }
              ],
              nomineeResponses: [
                {
                  name: "Tharika",
                  datetime: "23/08/2024 01:49:42 PM",
                  committeeText: "pre award nominee",
                  comment: "enhancing communication networks, and supporting organizational processes across various industries. Successful IT projects require meticulous planning, seamless integration, and ongoing maintenance to ensure optimal functionality and alignment with organizational objectives.",
                  score: 92 // Add score
                }
              ]
            }
          }
        ],
        allShortlistPreaward: [
          {
            name: "Jeny pvt ltd",
            members: {
              shortlistCommitteeResponses: [
                {
                  name: "Tharika",
                  datetime: "23/08/2024 01:39:34 PM",
                  shortlisted: true,
                  committeeText: "Shortlist committee one",
                  comment: '"IT" redirects here. For the customer service colloquially referred to as IT, see Tech support. For other uses, see It (disambiguation).\n\n"Infotech" redirects here. For the Indian company, see Cyient.\n\nFor the Hong Kong constituency, see Information Technology (constituency).',
                  score: 85 // Add score
                }
              ],
              shortlistNomineeResponses: [
                {
                  name: "Dilruwan",
                  datetime: "23/08/2024 01:45:40 PM",
                  shortlisted: false,
                  committeeText: "Shortlist Nominee",
                  comment: '"IT" redirects here. For the customer service colloquially referred to as IT, see Tech support. For other uses, see It (disambiguation).\n\n"Infotech" redirects here. For the Indian company, see Cyient.\n\nFor the Hong Kong constituency, see Information Technology (constituency).',
                  score: 70 // Add score
                }
              ],
              preawardCommitteeResponses: [
                {
                  name: "Dilruwan",
                  datetime: "23/08/2024 01:45:15 PM",
                  committeeText: "Pre award committee 1",
                  comment: "Although humans have been storing, retrieving, manipulating, and communicating information since the earliest writing systems were developed, the term information technology in its modern sense first appeared in a 1958 article published in the Harvard Business Review; authors Harold J. Leavitt and Thomas L. Whisler commented that",
                  score: 88 // Add score
                }
              ],
              preawardNomineeResponses: [
                {
                  name: "Tharika",
                  datetime: "23/08/2024 01:49:42 PM",
                  committeeText: "pre award nominee",
                  comment: "enhancing communication networks, and supporting organizational processes across various industries. Successful IT projects require meticulous planning, seamless integration, and ongoing maintenance to ensure optimal functionality and alignment with organizational objectives.",
                  score: 92 // Add score
                }
              ]
            }
          }
        ]
      }
    }
  ];


  activeCommittee: Committee;
  responseFilter: string = 'all-shortlist';
  selectedData: Company[] = [];

  expandedSuppliers: { [key: string]: boolean } = {};

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.committees.length > 0) {
      this.activeCommittee = this.committees[0];
      this.updateSelectedData();
      if (this.activeCommittee.members.length > 0 && this.activeCommittee.members[0].suppliers.length > 0) {
        this.activeCommittee.members[0].suppliers.forEach(supplier => {
          this.expandedSuppliers[supplier.name] = false;
        });
      }
    }
  }

  ngAfterViewInit() {
    this.adjustSupplierColumnHeight();
  }

  openPopup() {
    this.isPopupOpen = true;
  }

  closePopup() {
    this.isPopupOpen = false;
  }

  onCommitteeChange(index: number) {
    this.activeCommittee = this.committees[index];
    this.updateSelectedData();
    this.adjustSupplierColumnHeight();
  }

  onResponseFilterChange(filter: string) {
    this.responseFilter = filter;
    this.updateSelectedData();
  }

  updateSelectedData() {
    switch (this.responseFilter) {
      case 'all-shortlist':
        this.selectedData = this.activeCommittee.responses.shortlist;
        break;
      case 'all-preaward':
        this.selectedData = this.activeCommittee.responses.preaward;
        break;
      case 'all-shortlist-preaward':
        this.selectedData = this.activeCommittee.responses.allShortlistPreaward;
        break;
    }
  }




  adjustSupplierColumnHeight() {
    setTimeout(() => {
      const rows = this.tableBody.nativeElement.querySelectorAll('tr');
      let currentMember = '';
      let memberHeight = 0;

      rows.forEach((row: HTMLElement) => {
        const memberNameCell = row.querySelector('td:first-child');
        if (memberNameCell) {
          const memberName = memberNameCell.textContent.trim();
          if (memberName !== currentMember) {
            // New member, update heights for previous member
            if (currentMember) {
              this.updateSupplierColumnHeight(currentMember, memberHeight);
            }
            currentMember = memberName;
            memberHeight = 0;
          }
        }
        memberHeight += row.offsetHeight;
      });

      // Update height for the last member
      if (currentMember) {
        this.updateSupplierColumnHeight(currentMember, memberHeight);
      }
    });
  }

  updateSupplierColumnHeight(memberName: string, height: number) {
    const supplierColumns = this.tableBody.nativeElement.querySelectorAll(`.supplier-column[data-member="${memberName}"]`);
    supplierColumns.forEach((column: HTMLElement) => {
      column.style.height = `${height}px`;
      const nameSpan = column.querySelector('.supplier-name') as HTMLElement;
      if (nameSpan) {
        nameSpan.style.height = `${height - 48}px`; // Subtract space for buttons
      }
    });
  }

  getTotalRows(member: any): number {
    return member.categories.reduce((sum: number, cat: any) => sum + cat.sections.length, 0);
  }

  toggleSupplier(supplierName: string, event: Event) {
    event.stopPropagation();
    this.expandedSuppliers[supplierName] = !this.expandedSuppliers[supplierName];
  }

  isSupplierExpanded(supplierName: string): boolean {
    return this.expandedSuppliers[supplierName] || false;
  }

  goToSupplierDetails(supplier: any, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/supplier', supplier.name]);
  }

  getCombinedIndex(categoryIndex: number, sectionIndex: number, member: any): number {
    let index = 0;
    for (let i = 0; i < categoryIndex; i++) {
      index += member.categories[i].sections.length;
    }
    return index + sectionIndex;
  }

  trackByMember(index: number, member: Member): string {
    return member.name;
  }

  trackByCategory(index: number, category: Category): string {
    return category.name;
  }

  trackBySection(index: number, section: Section): string {
    return section.name;
  }
}