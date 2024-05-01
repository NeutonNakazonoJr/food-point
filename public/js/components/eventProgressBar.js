function spanEventCreator(tinyBall, bigBall, text) {
	const span = document.createElement("span");
	if (tinyBall) {
		span.classList.add("eventProgress__tiny-ball");
	} else if (bigBall) {
		span.id = "eventProgress__big-ball";
	} else if (text && typeof text === "string") {
		span.textContent = text;
	}
	return span;
}

function createBallsAndText(eventTitles = []) {
	const balls = [];
	const texts = [];

	eventTitles.forEach((title) => {
		const ball = spanEventCreator(true, null, null);
		const text = spanEventCreator(null, null, title);

		balls.push(ball);
		texts.push(text);
	});
	return {
		balls: balls,
		texts: texts,
	};
}

function addShowTextOnHover(textSpan, circle) {
	function loseOpacity() {
		textSpan.style.opacity = 0;
	}
	function gainOpacity() {
		textSpan.style.opacity = 1;
	}

	if (
		circle.$removeEventListener &&
		typeof circle.$removeEventListener === "function"
	) {
		circle.$removeEventListener();
	}

	textSpan.style.opacity = 0;
	circle.addEventListener("mouseenter", gainOpacity);
	circle.addEventListener("mouseleave", loseOpacity);
	circle.$removeEventListener = () => {
		circle.removeEventListener("mouseenter", gainOpacity);
		circle.removeEventListener("mouseleave", loseOpacity);
	};
}

function createEventBalls(
	animation = true,
	showTextOffTheNextStages = true,
	lastStage = 0,
	currentStage = 0,
	eventTitles = []
) {
	const ballsContainer = document.createElement("span");
	ballsContainer.id = "eventProgress";

	const eventTitlesContainer = document.createElement("span");
	eventTitlesContainer.id = "eventProgress-titles";

	const ballsAndText = createBallsAndText(eventTitles);

	ballsAndText.balls.forEach((ball) => {
		if (animation) {
			ball.style.animationName = "animateSpawnBall";
		}
		ballsContainer.appendChild(ball);
	});

	ballsAndText.texts.forEach((text, index) => {
		if (index !== currentStage && showTextOffTheNextStages) {
			addShowTextOnHover(text, ballsAndText.balls[index]);
		}
		eventTitlesContainer.appendChild(text);
	});

	let bigBall;

	setTimeout(() => {
		bigBall = bigBallConstructor(
			true,
			ballsAndText.balls[lastStage],
			ballsAndText.balls[currentStage]
		);
		ballsContainer.appendChild(bigBall);
	}, 100);

	window.addEventListener("changestateoftimeline", (e) => {
		const { currentStage, lastStage } = e.detail;
		const newBigBall = bigBallConstructor(
			false,
			ballsAndText.balls[lastStage],
			ballsAndText.balls[currentStage]
		);

		ballsContainer.removeChild(bigBall);
		ballsContainer.appendChild(newBigBall);
		bigBall = newBigBall;

		ballsAndText.texts.forEach((text, index) => {
			text.style.opacity = 1;
			if (index !== currentStage && showTextOffTheNextStages) {
				addShowTextOnHover(text, ballsAndText.balls[index]);
			}
		});
	});

	const wrapper = document.createDocumentFragment();
	wrapper.appendChild(ballsContainer);
	wrapper.appendChild(eventTitlesContainer);

	return wrapper;
}

function bigBallConstructor(
	isFirstLoad = false,
	ballFromLastStage,
	ballFromCurrentStage
) {
	const bigBall = spanEventCreator(null, true, null);

	const bigBallController = {
		move: (posX) => {
			bigBall.style.left = `${posX - 9}px`;
		},
		spawnFella: () => {
			bigBall.classList.remove("eventProgress__BigBall-withoutFella");
			bigBall.classList.add("eventProgress__BigBall-withFella");
		},
		killFella: () => {
			bigBall.classList.remove("eventProgress__BigBall-withFella");
			bigBall.classList.add("eventProgress__BigBall-withoutFella");
		},
	};

	window.addEventListener("resize", () => {
		bigBall.style.transition = "none 0ms";
		bigBallController.move(ballFromCurrentStage.offsetLeft);
		bigBall.style.transition = "all 0ms";
	});

	if (!isFirstLoad) {
		bigBallController.killFella();
	}
	bigBallController.move(ballFromLastStage.offsetLeft);
	setTimeout(() => {
		bigBallController.move(ballFromCurrentStage.offsetLeft);
		setTimeout(() => {
			bigBallController.spawnFella();
		}, 500);
	}, 500);

	return bigBall;
}

export default function eventProgressBar(
	animation = true,
	showTextOffTheNextStages = true,
	lastStage = 0,
	currentStage = 0,
	eventTitles = ["Básico", "Menu", "Local", "Convidados", "Pronto!"]
) {
	const eventWrapper = document.createElement("div");
	eventWrapper.id = "eventProgress-wrapper";

	const content = createEventBalls(
		animation,
		showTextOffTheNextStages,
		lastStage,
		currentStage,
		eventTitles
	);
	eventWrapper.appendChild(content);

	return eventWrapper;

}
