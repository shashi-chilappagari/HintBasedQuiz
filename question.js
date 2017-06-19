var questions=[
	{
		"question": "I am often regarded as the first computer programmer",
		"questionType": ["MultChoice"],
		"options":["Charles Babbage","Ada Lovelace","John von Neumann","Alan Turing"],
		"answer": [1],
		"answerImages":["CharlesBabbage.jpg","AdaLovelace.jpg","JohnvonNeumann.gif","AlanTuring.jpg"],
		"response":["Yes, the correct answer is Ada Lovelace","Sorry, the correct answer is Ada Lovelace"],
		"hints":["Michael Farady was a supporter of my writings","Augustus De Morgan was one of my tutors","I am related to Lord Byron"],
		"furthertopics":["Babbage: Postal system and other inventions","Ada Lovelace: The Byron connection","von Neumann: Photographic memory and cognitive abilities","The Turing Test and its relation to CAPTCHA"],
		"topicIds":[1,2,3,4],
		"imageCredits":["Ada Lovelace: Alfred Edward Chalon [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3AAda_Lovelace_portrait.jpg\">via Wikimedia Commons</a>",
		"Charles Babbage: By Unknown staff artist for The Illustrated London News [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3ACharlesBabbage.jpg\">via Wikimedia Commons</a>",
		"Alan Turing: By Antoine Taveneaux (Own work) [<a href=\"http://creativecommons.org/licenses/by-sa/3.0\">CC BY-SA 3.0</a>], <a href=\"https://commons.wikimedia.org/wiki/File%3ATuring-statue-Bletchley_14.jpg\">via Wikimedia Commons</a>",
		"John von Neumann: By LANL [Public domain or Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3AJohnvonNeumann-LosAlamos.gif\">via Wikimedia Commons</a>"],

	},
	{
		"question":["This theory was proposed by the economist Harry Markowitz in 1952 for which he was awarded a Nobel prize in Economics"],
		"options":["Capital Asset Pricing Model","Decision Theory","Prospect Theory","Modern Portfolio Theory"],
		"answer":[3],
		"response":["Good job. Modern Portfolio Theory is the correct answer","Sorry, the correct answer is Modern Portfolio Theory"],
		"hints":["It is a mathematical framework for assembling a portfolio of assets such that the expected return is maximized for a given level of risk","It says that an investor can reduce portfolio risk simply by holding combinations of instruments that are not perfectly positively correlated","The efficient frontier is a key concept in this theory"],
		"furthertopics":["Portfolio optimization","Two mutual fund theorem","Loss aversion","Pignistsic probability"],
		"topicIds":[5,6,7,8]
	},
	{
		"question":["I was discovered in 1791 by the clergyman and amateur geologist WIlliam Gregor"],
		"questionType": ["MultChoice"],
		"options":["Aluminum","Vanadium","Titanium","Tungsten"],
		"answer": [2],
		"hints":["My alloys are used in aircraft, armor plating, naval ships, spacecraft, and missiles",
		"I am the ninth most abundant element in Earth's crust and the seventh-most abundant metal","My name comes from Greek mythology"],
		"response":["Yes, the correct answer is Titanium","Sorry, the correct answer is Titanium"],
		"furthertopics":["Titanium in jewelry","Applications of Tungsten","Aluminum or Aluminium?","Vanadium: The Scandanavian connection"],
		"topicIds":[9,10,11,12]
	},

	{
		"question":["Identify the book/play"],
		"questionType": ["MultChoice"],
		"options":["Don Quixote","The Hobbit","The Two Gentlemen of Verona","King Arthur"],
		"answer":[0],
		"questionImage":["DonQuixote.jpg"],
		"response":["Yes, the correct answer is Don Quixote","Sorry, the correct answer is Don Quixote"],
		"hints":["The story is about chivalry and justice","It is considered  to be one of the greatest novels ever written","It is written by Miguel de Cervantes"],
		"furthertopics":["Works influenced by Don Quixote","Shakespeare's comedies","The fictional history of the Hobbits","Attributes of the Excalibur"],
		"imageCredits":["Gustave Dore [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3ADon_Quijote_and_Sancho_Panza.jpg\">via Wikimedia Commons</a>"],
		"topicIds":[13,14,15,16]
	},
	{
		"question":["I wrote the book titled Liber Abaci which popularized the Hindu-Arabic numeral system"],
		"questionType": ["MultChoice"],
		"options":["Pierred de Fermat","Fibonacci","al-Khwarizmi","Omar Khayyam"],
		"answer":[1],
		"hints":["I was born around 1175","I posed and solved a problem involving the growth of rabbit population","The numbers named after me pop up in many places"],
		"response":["Yes, the correct answer is Fibonacci","Sorry, the correct answer is Fibonacci"],
		"furthertopics":["Fermat's last theorem","Fibonacci numbers and the golden ratio","al-Khwarizmi: The root of algebra, algorism and algorithm","Edward FitzGerald and The Rubaiyat of Omar Khayyam"],
		"topicIds":[17,18,19,20]
	},
	{
		"question": "My heart rate is 10 beats per minutes and can be heard from a distance of 1 mile.",
		"questionType": ["MultChoice"],
		"options":["Blue Whale","Dolphin","Sea Lion","Shark"],
		"answer": [0],
		"response":["Good job. Blue whale is the correct answer","Sorry, the correct answer is Blue Whale"],
		"answerImages":["Whale.jpg","Dolphin.jpg","SeaLion.jpg","Shark.jpg"],
		"hints":["I evolved from Indohyus","The Hippopotamus is my closest relative","I am the largest mammal in the world"],
		"audioClips":['Whale.mp3'],
		"audioIntro":['Want to know more about the strange origin of Whales. Listen to this audio clip.'],
		"feedbackType":["Correct/Incorrect"],
		"feedback":["Blue whales are amazing animals","Dolphins, sea lions and sharks are not so amazing"],
		"furthertopics":["Evolution of whales","Intelligence of dolphins","Sharks in Hawaiian mythlogy","Breeding methods of sea lions"],
		"topicIds":[21,22,23,24]
	},
	{
		"question": "I was second Lucasian Professor of Mathematics at the University of Cambridge",
		"questionType": ["MultChoice"],
		"options":["Isaac Newton","Isaac Barrow","Robert Hooke","Edmond Halley"],
		"answer":[0],
		"hints":["I was the master of the Royal Mint of England for about 30 years","I wrote a book titled Principia Mathematica","I am credited with the development of calculus"],
		"response":["Good job. Newton is the correct answer","Sorry, the correct answer is Newton"],
		"furthertopics":["Halley's role in the publication of Principia","The apple incident and gravity","Quotes by Newton","Newton's not-so cordial relationship with Robert Hook"],
		"topicIds":[25,26,27,28]
	},

	{
		"question": "I won the Nobel Prize in Physics for Photo-Electric Effect.",
		"questionType": ["MultChoice"],
		"options":["Max Planck","Albert Einstein","Niels Bohr","Erwin Schrodinger"],
		"answer": [1],
		"response":["Good job. Albert Einstein is the correct answer","Sorry, the correct answer is Albert Einstein"],
		"answerImages":["Max_Planck.jpg","Einstein.jpg","Niels_Bohr.jpg","Schrodinger.jpg"],
		"hints":["I immigrated to USA and worked at Princeton","I am most famous for my work on Relativity"],
		"furthertopics":["Black body radiation","1926: The Miracle Year","The Copenhagen interpretation of quantum mechanics","Schrdoinger's cat: dead and alive"],
		"feedback":["Einstein did not win for his most famous work","Max Plack won for his contributions to Quantum mechanics",
								"Neils Bohr won for atomic model","Schrodinger won for his service to cats"],
		"imageCredits":["Albert Einstein: Photograph by Orren Jack Turner, Princeton, N.J.Modified with Photoshop by PM_Poon and later by Dantadd.[Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3AAlbert_Einstein_Head.jpg\">via Wikimedia Commons</a>",
	"Neils Bohr: By The American Institute of Physics credits the photo [1] to AB Lagrelius & Westphal, which is the Swedish company used by the Nobel Foundation for most photos of its book series Les Prix Nobel. (Niels Bohr's Nobel Prize biography, from 1922) [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3ANiels_Bohr.jpg\">via Wikimedia Commons</a>",
"Max Planck: See page for author [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3AMax_Planck_1933.jpg\">via Wikimedia Commons</a>",
"Erwin Schrodinger: By Nobel foundation [Public domain], <a href=\"https://commons.wikimedia.org/wiki/File%3AErwin_Schr%C3%B6dinger_(1933).jpg\">via Wikimedia Commons</a>" ],
	"topicIds":[29,30,31,32]
				},


];
