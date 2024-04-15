/** Connects to food point API and returns the events of a
 * specific user
 *
 */
export function getEvents(userID) {
	// this is just a test information for developers 
	return [
		{
			eventID: 1234,
			userID: userID,
			name: "Evento bom demaisé",
			theme: "Churrasco",
			description: "Vaai ser mt legal !!",
			location: "Rua da sé",
		},
		{
			eventID: 5678,
			userID: userID,
			name: "Festa de Aniversário da Maria",
			theme: "Aniversário",
			description:
				"Vamos comemorar o aniversário da Maria com bolo, doces e muita diversão!",
			date: new Date("04-15-2024"),
			location: "Rua das Flores, número 123",
		},
		{
			eventID: 91011,
			userID: userID,
			name: "Encontro de Amigos no Parque",
			theme: "Picnic",
			description:
				"Um dia de diversão ao ar livre com jogos, comida e boas risadas!",
			location: "Parque da Cidade, ao lado do lago",
		},
		{
			eventID: 121314,
			userID: userID,
			name: "Workshop de Fotografia",
			theme: "Fotografia",
			description:
				"Aprenda técnicas avançadas de fotografia com profissionais renomados!",
			date: new Date("06-10-2024"),
			location: "Estúdio Fotográfico Central, Av. Principal, número 456",
		},
		{
			eventID: "abc123",
			userID: userID,
			name: "Concerto no Parque",
			theme: "Música",
			description:
				"Venha curtir um concerto ao ar livre com diversas bandas locais!",
		},
		{
			eventID: 151617,
			userID: userID,
			name: "Feira de Artesanato",
			theme: "Artesanato",
			description:
				"Venha conferir as mais belas obras de arte feitas à mão!",
			date: new Date("08/12/2000"),
			location: "Praça Central",
		},
		{
			eventID: 8765	,
			userID: userID,
			name: "Concerto ao Ar Livre",
			theme: "Música",
			description:
				"Um concerto emocionante com bandas locais e artistas convidados!",
			date: new Date("07/25/2024"),
			location: "Parque Municipal",
		},
		{
			eventID: 181920,
			userID: userID,
			name: "",
			theme: "Cinema ao Ar Livre",
			description: "Desfrute de filmes clássicos sob as estrelas!",
			date: new Date("09/05/2024"),
			location: "Campo de Futebol",
		},
		{
			eventID: 212223,
			userID: userID,
			name: "Exposição de Arte",
			theme: "Arte",
			description:
				"Uma exposição imperdível com obras de artistas locais e internacionais!",
			location: "Galeria de Arte Municipal",
		},
		{
			eventID: 242526,
			userID: userID,
			name: "Festival Gastronômico",
			theme: "Gastronomia",
			description:
				"Experimente pratos deliciosos preparados pelos melhores chefs da região!",
			location: "Praça da Alimentação",
		},
	];
}
