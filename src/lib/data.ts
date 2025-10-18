export type Document = {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  publishDate: string;
  createdAt: number;
};

// In a real application, this would be a database.
// For this prototype, we use a simple in-memory array.
export let documents: Document[] = [
  {
    id: '1',
    title: 'Arne Næss and the Deep Ecology Movement',
    content: 'Arne Dekke Eide Næss was a Norwegian philosopher who made significant contributions to the fields of environmental philosophy and social justice. He was the founder of the deep ecology movement, which advocates for a radical shift in human consciousness and a new relationship with the natural world. This document explores his key ideas and their impact on modern environmental thought, tracing the development of deep ecology from its inception to its current state. Næss argued for an inherent value in all living beings, regardless of their utility to humans, a concept he termed "biospherical egalitarianism".',
    summary: 'An exploration of Arne Næss\'s foundational role in the deep ecology movement, detailing his philosophical contributions to environmentalism, social justice, and the concept of "biospherical egalitarianism".',
    category: 'Environmental Philosophy',
    tags: ['Arne Næss', 'Deep Ecology', '20th Century'],
    publishDate: '1973-01-15',
    createdAt: 1673740800000,
  },
  {
    id: '2',
    title: 'The Philosophy of Peter Wessel Zapffe',
    content: 'Peter Wessel Zapffe was a Norwegian metaphysician, author, and mountaineer. He is best known for his philosophically pessimistic and antinatalist worldview. His magnum opus, "On the Tragic," posits that human beings are a biological paradox, over-equipped with a consciousness that is not fit for the world. This consciousness forces humans to seek meaning in a meaningless universe, leading to inevitable suffering. Zapffe proposed four main defense mechanisms: isolation, anchoring, distraction, and sublimation, which humans use to cope with their tragic condition.',
    summary: 'A summary of Peter Wessel Zapffe\'s pessimistic and antinatalist philosophy, focusing on his work "On the Tragic" and the concept of humanity as a biological paradox doomed to suffer.',
    category: 'Metaphysics',
    tags: ['Peter Wessel Zapffe', 'Pessimism', 'Antinatalism'],
    publishDate: '1941-05-20',
    createdAt: 1673654400000,
  },
  {
    id: '3',
    title: 'Existentialism in Post-War Norway',
    content: 'The post-World War II era in Norway saw a surge in existentialist thought, influenced heavily by figures like Jean-Paul Sartre and Albert Camus, but with a distinct Norwegian character. This paper examines the works of Norwegian existentialists such as Jens Bjørneboe and Axel Sandemose and how they grappled with questions of freedom, responsibility, and meaning in a rapidly modernizing society that was also dealing with the trauma of occupation. The concept of "Jante Law" (Janteloven) as a societal constraint on individual freedom is a recurring theme.',
    summary: 'This paper discusses the rise of existentialism in post-war Norway, analyzing its unique characteristics, the influence of major European existentialists, and the grappling with concepts like "Jante Law".',
    category: 'Existentialism',
    tags: ['Post-War Philosophy', 'Norwegian Existentialism', 'Janteloven'],
    publishDate: '1955-11-01',
    createdAt: 1673568000000,
  },
];

// Function to add a new document
export const addDocument = (doc: Omit<Document, 'id' | 'createdAt'>) => {
  const newDoc: Document = {
    ...doc,
    id: (Date.now() + Math.random()).toString(),
    createdAt: Date.now(),
  };
  documents.unshift(newDoc);
  return newDoc;
};
