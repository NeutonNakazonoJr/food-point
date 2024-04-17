/** Defines the stage of the timeline |
 * please provide a number between 0 - 4 for both params.
 * Otherwise, the function will assume 1 as stage.
 * @param {number = 0 | 1 | 2 | 3 | 4} currentStage
 * @param {number = 0 | 1 | 2 | 3 | 4} nextStage
 */
export default function dispatchChangeStageOfTimeline(
	currentStage = 0,
	lastStage = 0
) {
	const realCurrentStage =
		currentStage < 0 || currentStage > 4 ? 0 : currentStage;
	const realLastStage = lastStage < 0 || lastStage > 4 ? 0 : lastStage;
	
	const event = new CustomEvent("changestateoftimeline", {
		detail: {
			currentStage: realCurrentStage,
			lastStage: realLastStage,
		},
	});

	window.dispatchEvent(event);
}
