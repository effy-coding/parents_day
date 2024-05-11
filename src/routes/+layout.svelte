<script>
	import '../app.css';

	const name = '엄마, 아빠는 뭐 좋아해?';
	const summary = '우리 부모님이 남겨주신 취향들을 확인해보세요';
</script>

<svelte:head>
	<title>{name}</title>
	<meta name="description" content={summary} />
	<meta property="og:title" content={name} />
	<meta property="og:description" content={summary} />
	<meta property="og:image" content="https://parents-day.pages.dev/og.png" />
	<meta property="og:url" content="https://parents-day.pages.dev" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={name} />
	<meta name="twitter:description" content={summary} />
	<meta name="twitter:image" content="https://parents-day.pages.dev/og.png" />
</svelte:head>

<div class="font-sans flex flex-col justify-center items-center">
	<div class="w-full sm:max-w-sm sm:w-auto p-4 bg-white">
		<slot />
	</div>
</div>
