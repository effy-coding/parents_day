<script lang="ts">
	let currentQuestion = 0;
	let currentQuestionIndex = 0;

	let questions = [
		'평소에 가장 선호하시는 색깔은 무엇인가요?',
		'집안에서 가장 좋아하는 공간은 어디이며, 그 이유는 무엇인가요?',
		'평소에 가장 많이 사용하시는 물건이나 액세서리는 무엇인가요?',
		'평소에 읽으시는 책이나 잡지의 장르는 어떤 것인가요?',
		'향수나 방향제 등 향기 제품을 사용하신다면 선호하는 향은 무엇인가요?',
		'음악을 들으실 때 가장 좋아하는 음악 장르나 아티스트는 누구인가요?',
		'최근에 관심 있어하시는 취미나 활동이 있으신가요?',
		'앞으로 시도해보고 싶은 취미나 체험은 무엇인가요?',
		'개인적인 시간을 보낼 때 가장 선호하는 음료나 간식은 무엇인가요?',
		'평소에 스트레스를 해소하는 방법이나 좋아하는 휴식 방식은 무엇인가요?'
	];

	let indexString = [
		'첫 번째',
		'두 번째',
		'세 번째',
		'네 번째',
		'다섯 번째',
		'여섯 번째',
		'일곱 번째',
		'여덟 번째',
		'아홉 번째',
		'열 번째'
	];

	let answers = [];

	function handleNext(answer: string) {
		answers.push(answer);
		currentQuestion++;
	}
</script>

<div
	class="h-full p-6 border-black border-2 rounded-md shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white"
>
	<p class="mt-2 text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
		엄마, 아빠는 뭐 좋아해?
	</p>

	<p class="mb-4">가정의 달을 맞아 우리 엄마 아빠 취향을 알아보고 싶어</p>

	<article class="w-full h-full">
		<div class="text-left h-full">
			<p class="mb-4 line-clamp-4">
				{#if currentQuestion < questions.length}
					<div>
						<h2>{questions[currentQuestion]}</h2>

						<input
							type="text"
							class="mt-2 w-full border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
							placeholder="..."
							on:keydown={(e) => e.key === 'Enter' && handleNext(e.target.value)}
						/>
					</div>
				{:else}
					<div>
						<h2>모든 질문에 답변해주셔서 감사합니다!</h2>
						<p>답변 내용:</p>
						<ul>
							{#each answers as answer, index}
								<li>{index + 1}: {answer}</li>
							{/each}
						</ul>
					</div>
				{/if}
			</p>
			<button
				class="h-12 w-1/3 border-black border-2 p-2.5 bg-primary-500 hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-primary-400 rounded-md"
			>
				다음
			</button>
		</div>
	</article>
</div>
