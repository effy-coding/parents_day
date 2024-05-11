<script lang="ts">
	import { onMount } from 'svelte';

	let currentQuestion = 0;

	const questions = [
		{
			q: '평소에 즐겨 읽는 책의 장르가 뭐야?',
			a: ''
		},
		{
			q: '여행을 갈 때 가장 선호하는 여행 스타일은 어떤 거야? (예: 휴양지, 도시 탐방, 자연 탐험 등)',
			a: ''
		},
		{
			q: '가장 좋아하는 색깔은 뭐야?',
			a: ''
		},
		{
			q: '향수나 방향제 같은거 살때 어떤 향을 좋아해?',
			a: ''
		},
		{
			q: '가장 좋아하는 음악 장르랑 아티스트는 누구야?',
			a: ''
		},
		{
			q: '최근에 감명 깊게 본 영화나 도서 있어?',
			a: ''
		},
		{
			q: '앞으로 시도해보고 싶은 취미나 활동 있어?',
			a: ''
		}
	];

	const indexString = [
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

	function handlePrevious() {
		currentQuestion--;
		// Focus on answer input auto
		setTimeout(() => {
			document.getElementById('answer')?.focus();
		}, 0);
	}

	function handleNext() {
		if (questions[currentQuestion].a) {
			currentQuestion++;
			setTimeout(() => {
				document.getElementById('answer')?.focus();
			}, 0);
		}
	}

	function reset() {
		currentQuestion = 0;
		questions.forEach((item) => {
			item.a = '';
		});
	}

	function generateShareableLink() {
		const params = new URLSearchParams();
		questions.forEach((item, index) => {
			params.append(`q${index + 1}`, encodeURIComponent(item.a));
		});

		const url = `${window.location.href}?${params.toString()}`;
		console.log(url);
		return url;
	}

	function loadAnswersFromURL() {
		const params = new URLSearchParams(window.location.search);
		let allAnswersLoaded = true;
		questions.forEach((item, index) => {
			const answer = params.get(`q${index + 1}`);
			if (answer) {
				item.a = decodeURIComponent(answer);
			} else {
				allAnswersLoaded = false;
			}
		});
		if (allAnswersLoaded) {
			currentQuestion = questions.length; // 이제 결과 페이지로 바로 이동
		}
	}

	onMount(() => {
		loadAnswersFromURL();
	});
</script>

<p
	class="bg-primary-400 p-2 rounded-md mb-4 text-xl font-extrabold leading-none tracking-tight text-center"
>
	엄마, 아빠는 뭐 좋아해?
</p>

<div
	class="h-full p-6 border-black border-2 rounded-md shadow-[8px_8px_0px_rgba(0,0,0,1)] bg-white"
>
	{#if currentQuestion < questions.length}
		<p class="mb-6 font-normal text-gray-700">
			가정의 달을 맞아 우리 엄마 아빠 취향을 알아보고 싶어
		</p>
	{:else}
		<p class="mb-6 font-normal text-gray-700">우리 부모님이 남겨주신 취향들을 확인해보세요</p>
		<svg
			class="mx-auto w-4 h-4 mb-4 text-gray-400"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 18 14"
		>
			<path
				d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
			/>
		</svg>
	{/if}
	<article class="w-full h-full">
		<div>
			<p class="line-clamp-4">
				{#if currentQuestion < questions.length}
					<div class="flex flex-col items-center justify-center text-center">
						<blockquote class="font-semibold text-gray-900">
							<p class="mb-4 text-sm text-gray-500">
								{indexString[currentQuestion]} 질문
							</p>
							<div class="inline-flex items-center justify-center w-full">
								<hr class="w-64 h-1 my-8 bg-gray-200 border-0 rounded" />
								<div class="absolute px-4 -translate-x-1/2 bg-white left-1/2">
									<svg
										class="w-4 h-4 text-gray-400"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 18 14"
									>
										<path
											d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
										/>
									</svg>
								</div>
							</div>
							<p class="text-lg">{questions[currentQuestion].q}</p>
						</blockquote>
						<input
							id="answer"
							type="text"
							bind:value={questions[currentQuestion].a}
							class="mt-4 w-full text-center border-black border-2 p-2.5 transition duration-300 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-primary-500 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
							placeholder="..."
							on:keydown={(e) => e.key === 'Enter' && handleNext()}
						/>
					</div>
					<div class="mt-8 flex justify-between">
						{#if currentQuestion > 0}
							<button
								class="h-12 w-1/3 border-black border-2 p-2.5 transition duration-300 ease-in-out bg-white hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
								on:click={handlePrevious}
							>
								이전
							</button>
						{:else}
							<div></div>
						{/if}
						<button
							class:bg-primary-400={questions[currentQuestion].a}
							class="h-12 w-1/3 border-black border-2 p-2.5 transition duration-300 ease-in-out hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
							on:click={handleNext}
						>
							다음
						</button>
					</div>
				{:else}
					<div class="flex flex-col">
						<ul>
							{#each questions as q}
								<li class="text-sm text-gray-700">{q.q}</li>
								<li class="text-lg mb-3">{q.a}</li>
							{/each}
						</ul>
						<hr class="w-48 h-1 mx-auto bg-gray-200 border-0 rounded mb-8" />

						<button
							on:click={generateShareableLink}
							class="bg-primary-500 h-12 w-full border-black border-2 p-2.5 transition duration-300 ease-in-out hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
						>
							자녀들에게 공유하기
						</button>
						<button
							on:click={reset}
							class="mt-4 bg-primary-400 h-12 w-full border-black border-2 p-2.5 transition duration-300 ease-in-out hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-md"
						>
							처음으로
						</button>
					</div>
				{/if}
			</p>
		</div>
	</article>
</div>
