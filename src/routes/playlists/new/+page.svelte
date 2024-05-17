<script>
	import { PlaylistForm } from '$components';

	export let form;
	export let data;
</script>

<h2>Add a new playlist</h2>
<PlaylistForm {form} userID={data?.user?.id} />
