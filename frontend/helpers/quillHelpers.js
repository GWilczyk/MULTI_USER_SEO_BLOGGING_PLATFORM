export const QuillModules = {
	toolbar: [
		[{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
		[{ size: [] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		['link', 'image', 'video'],
		['clean'],
		['code-block'],
	],
};

export const QuillFormats = [
	'blockquote',
	'bold',
	'bullet',
	'code-block',
	'font',
	'header',
	'image',
	'italic',
	'link',
	'list',
	'size',
	'strike',
	'underline',
	'video',
];
