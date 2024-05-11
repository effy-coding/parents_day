<script lang="ts">
	import { goto } from '$app/navigation';
	import LZ from 'lz-string';
	import { onMount } from 'svelte';

	let currentQuestion = 0;

	const questions = [
		{
			q: '평소에 즐겨 읽는 책의 장르가 뭐야? (예: 소설, 산문, 자기계발서)',
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
			q: '가장 좋아하는 음악 장르랑 아티스트는 누구야? (예: 팝, 클래식, 힙합, 락 등)',
			a: ''
		},
		{
			q: '최근에 감명 깊게 본 영화나 도서 있어?',
			a: ''
		},
		{
			q: '앞으로 시도해보고 싶은 취미나 활동 있어?',
			a: ''
		},
		{
			q: '가장 기억에 남는 여행지는 어디야? 이유는 뭐야?',
			a: ''
		},
		{
			q: '오늘 저녁 메뉴로 먹고 싶은 음식은 뭐야?',
			a: ''
		},
		{
			q: '가장 좋아하는 계절은 뭐야? 이유는?',
			a: ''
		},
		{
			q: '꼭 가보고 싶은 콘서트 있어?',
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
		'열 번째',
		'열한 번째',
		'열두 번째',
		'열세 번째',
		'열네 번째',
		'열다섯 번째'
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
		goto('/');
		questions.forEach((item) => {
			item.a = '';
		});
	}

	function generateShareableLink() {
		const answers = questions.map((q) => q.a);
		const compressedData = LZ.compressToEncodedURIComponent(JSON.stringify(answers));
		const url = `${window.location.origin}${window.location.pathname}?data=${compressedData}`;

		// Share the URL
		if (window.navigator.share) {
			window.navigator.share({
				title: '엄마, 아빠는 뭐 좋아해?',
				text: '우리 부모님이 남겨주신 취향들을 확인해보세요',
				url
			});
		} else {
			navigator.clipboard.writeText(url);
			alert('공유 가능한 링크가 복사되었습니다 😸');
		}
	}

	// URL에서 데이터를 불러와 해제
	function loadAnswersFromURL() {
		const params = new URLSearchParams(window.location.search);
		const compressedData = params.get('data');
		if (compressedData) {
			const answers = JSON.parse(LZ.decompressFromEncodedURIComponent(compressedData));
			answers.forEach((answer: string, index: number) => {
				if (answer) {
					questions[index].a = answer;
				}
			});
			currentQuestion = questions.length; // 결과 페이지로 바로 이동
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
			<p>
				{#if currentQuestion < questions.length}
					<div class="flex flex-col items-center justify-center text-center">
						<blockquote class="font-semibold text-gray-900">
							<p class="mb-4 text-sm text-gray-500">
								{indexString[currentQuestion]} 질문 / {questions.length}
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
						<ul class="break-words">
							{#each questions as q}
								<li class=" text-sm text-gray-700">{q.q}</li>
								<li class=" text-lg mb-3">{q.a}</li>
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
<button
	on:click={() => {
		// Open YouTube in a new tab
		window.open('https://youtu.be/Tud5OGJYKQw', '_blank');
	}}
>
	<svg
		class="mt-4 w-8 h-8"
		xmlns="http://www.w3.org/2000/svg"
		shape-rendering="geometricPrecision"
		text-rendering="geometricPrecision"
		image-rendering="optimizeQuality"
		fill-rule="evenodd"
		clip-rule="evenodd"
		viewBox="0 0 640 640"
		><path
			d="M633.468 192.038s-6.248-44.115-25.477-63.485c-24.366-25.477-51.65-25.642-64.123-27.118-89.493-6.52-223.904-6.52-223.904-6.52h-.236s-134.352 0-223.893 6.52c-12.52 1.523-39.768 1.63-64.123 27.118-19.24 19.37-25.358 63.485-25.358 63.485S-.012 243.806-.012 295.681v48.509c0 51.768 6.366 103.643 6.366 103.643s6.248 44.114 25.358 63.52c24.355 25.477 56.363 24.65 70.655 27.367 51.237 4.89 217.644 6.366 217.644 6.366s134.529-.237 224.022-6.638c12.52-1.477 39.756-1.63 64.123-27.119 19.24-19.37 25.476-63.532 25.476-63.532S640 396.03 640 344.154v-48.508c-.13-51.769-6.497-103.643-6.497-103.643l-.035.035zm-379.8 211.007V223.173L426.56 313.41l-172.892 89.635z"
		/></svg
	>
</button>
