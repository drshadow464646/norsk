export type Document = {
  id: string;
  title: string;
  author: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  publishDate: string;
  wikipediaUrl: string;
  views: number;
  createdAt: number;
};

// In a real application, this would be a database.
// For this prototype, we use a simple in-memory array.
export let documents: Document[] = [
  {
    id: '1',
    title: 'Arne Næss and the Deep Ecology Movement',
    author: 'Arne Næss',
    content: 'Arne Dekke Eide Næss was a Norwegian philosopher who made significant contributions to the fields of environmental philosophy and social justice. He was the founder of the deep ecology movement, which advocates for a radical shift in human consciousness and a new relationship with the natural world. This document explores his key ideas and their impact on modern environmental thought, tracing the development of deep ecology from its inception to its current state. Næss argued for an inherent value in all living beings, regardless of their utility to humans, a concept he termed "biospherical egalitarianism".',
    summary: 'An exploration of Arne Næss\'s foundational role in the deep ecology movement, detailing his philosophical contributions to environmentalism, social justice, and the concept of "biospherical egalitarianism".',
    category: 'Environmental Philosophy',
    tags: ['Arne Næss', 'Deep Ecology', '20th Century'],
    publishDate: '1973-01-15',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Arne_N%C3%A6ss',
    views: 980,
    createdAt: 1673740800000,
  },
  {
    id: '2',
    title: 'The Philosophy of Peter Wessel Zapffe',
    author: 'Peter Wessel Zapffe',
    content: 'Peter Wessel Zapffe was a Norwegian metaphysician, author, and mountaineer. He is best known for his philosophically pessimistic and antinatalist worldview. His magnum opus, "On the Tragic," posits that human beings are a biological paradox, over-equipped with a consciousness that is not fit for the world. This consciousness forces humans to seek meaning in a meaningless universe, leading to inevitable suffering. Zapffe proposed four main defense mechanisms: isolation, anchoring, distraction, and sublimation, which humans use to cope with their tragic condition.',
    summary: 'A summary of Peter Wessel Zapffe\'s pessimistic and antinatalist philosophy, focusing on his work "On the Tragic" and the concept of humanity as a biological paradox doomed to suffer.',
    category: 'Metaphysics',
    tags: ['Peter Wessel Zapffe', 'Pessimism', 'Antinatalism'],
    publishDate: '1941-05-20',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Peter_Wessel_Zapffe',
    views: 950,
    createdAt: 1673654400000,
  },
  {
    id: '3',
    title: 'Existentialism in Post-War Norway',
    author: 'Jens Bjørneboe',
    content: 'The post-World War II era in Norway saw a surge in existentialist thought, influenced heavily by figures like Jean-Paul Sartre and Albert Camus, but with a distinct Norwegian character. This paper examines the works of Norwegian existentialists such as Jens Bjørneboe and Axel Sandemose and how they grappled with questions of freedom, responsibility, and meaning in a rapidly modernizing society that was also dealing with the trauma of occupation. The concept of "Jante Law" (Janteloven) as a societal constraint on individual freedom is a recurring theme.',
    summary: 'This paper discusses the rise of existentialism in post-war Norway, analyzing its unique characteristics, the influence of major European existentialists, and the grappling with concepts like "Jante Law".',
    category: 'Existentialism',
    tags: ['Post-War Philosophy', 'Norwegian Existentialism', 'Janteloven'],
    publishDate: '1955-11-01',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Existentialism',
    views: 720,
    createdAt: 1673568000000,
  },
  {
    id: '4',
    title: 'The Logic of Democracy by Anathon Aall',
    author: 'Anathon Aall',
    content: 'Anathon Aall was a central figure in Norwegian philosophy, bridging the 19th and 20th centuries. His work on the history of philosophy and the philosophy of religion was extensive, but his political philosophy, particularly his analysis of democracy, is noteworthy. Aall was critical of direct democracy, arguing for a more deliberative and representative model grounded in rational discourse and the protection of individual rights against the "tyranny of the majority." He believed that a healthy democracy required an educated citizenry and strong, independent institutions.',
    summary: 'An overview of Anathon Aall\'s political philosophy, focusing on his critique of direct democracy and his arguments for a representative model based on reason and individual rights.',
    category: 'Political Philosophy',
    tags: ['Anathon Aall', 'Democracy', 'Political Theory'],
    publishDate: '1918-09-10',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Anathon_Aall',
    views: 650,
    createdAt: 1673481600000,
  },
  {
    id: '5',
    title: 'Feminist Philosophy and the work of Cathrine Holst',
    author: 'Cathrine Holst',
    content: 'Contemporary Norwegian philosophy has seen significant contributions from feminist thinkers. Cathrine Holst is a prominent political philosopher whose work intersects with feminist theory, democratic theory, and the philosophy of science. She has critically examined the role of experts in policy-making and the conditions for legitimate democratic governance, often highlighting how gender biases can be embedded within supposedly neutral expertise and public discourse. Her work calls for a more inclusive and critically reflexive public sphere.',
    summary: 'An introduction to the work of contemporary feminist philosopher Cathrine Holst, exploring her analysis of democracy, expertise, and gender bias in the public sphere.',
    category: 'Feminist Philosophy',
    tags: ['Cathrine Holst', 'Feminism', 'Contemporary'],
    publishDate: '2010-06-22',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Feminist_philosophy',
    views: 510,
    createdAt: 1673395200000,
  },
  {
    id: '6',
    title: 'Scandinavian Realism in Legal Philosophy',
    author: 'Torfstein Eckhoff',
    content: 'The Scandinavian Legal Realism movement was a highly influential school of thought in the 20th century, with Norwegian philosopher Torstein Eckhoff as one of its key proponents. Unlike traditional legal theories that focused on abstract moral rights, the realists argued that law should be studied as an empirical, social phenomenon. Eckhoff analyzed legal norms as behavioral patterns and social facts, focusing on how judges and officials actually behave and how legal language influences their decisions. This approach sought to demystify the law and make it more predictable and scientific.',
    summary: 'A look at Scandinavian Legal Realism through the work of Torstein Eckhoff, who treated law not as abstract morals but as observable social facts and behavioral patterns.',
    category: 'Philosophy of Law',
    tags: ['Legal Realism', 'Torstein Eckhoff', 'Jurisprudence'],
    publishDate: '1966-03-05',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Scandinavian_legal_realism',
    views: 480,
    createdAt: 1673308800000,
  },
  {
    id: '7',
    title: 'The Aesthetics of Nature in Norwegian Thought',
    author: 'Various',
    content: 'The relationship with nature has been a profound and recurring theme in Norwegian culture and philosophy. This extends into aesthetics, where the sublime beauty of the Norwegian landscape—its fjords, mountains, and forests—has been a source of philosophical reflection. Thinkers have explored how these powerful natural environments shape human perception, emotion, and our sense of place in the cosmos. This aesthetic appreciation is not merely about beauty, but about the experience of awe, terror, and the sublime, linking the natural world to deep existential questions.',
    summary: 'An exploration of how the Norwegian landscape has influenced aesthetic philosophy, focusing on concepts of the sublime, awe, and nature\'s role in shaping human perception and existential reflection.',
    category: 'Aesthetics',
    tags: ['Aesthetics', 'Nature', 'Sublime'],
    publishDate: '1995-08-19',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Aesthetics_of_nature',
    views: 320,
    createdAt: 1673222400000,
  }
];

// Function to add a new document
export const addDocument = (doc: Omit<Document, 'id' | 'createdAt' | 'author' | 'views' | 'wikipediaUrl'> & Partial<Pick<Document, 'author' | 'views' | 'wikipediaUrl'>>) => {
  const newDoc: Document = {
    author: 'Unknown',
    views: 0,
    wikipediaUrl: '',
    ...doc,
    id: (Date.now() + Math.random()).toString(),
    createdAt: Date.now(),
  };
  documents.unshift(newDoc);
  return newDoc;
};
