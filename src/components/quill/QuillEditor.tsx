import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './index.css';

interface QuillEditorProps {
	value?: string;
	onChange?: (value: string) => void;
}

export interface QuillEditorHandle {
	getEditorContent: () => string;
}

const toolbarOptions = [
	{ size: ['small', false, 'large', 'huge'] },
	'bold',
	'italic',
	'underline',
	'link',
	'image',
	{ align: '' },
	{ align: 'center' },
	{ align: 'right' },
	{ align: 'justify' },
];

const QuillEditor = forwardRef<QuillEditorHandle, QuillEditorProps>(
	({ value, onChange }, ref) => {
		const quillRef = useRef<HTMLDivElement | null>(null);
		const quillInstance = useRef<Quill | null>(null);

		useEffect(() => {
			if (quillRef.current && !quillInstance.current) {
				quillInstance.current = new Quill(quillRef.current, {
					theme: 'snow',
					placeholder: 'Write a story...',
					modules: {
						toolbar: toolbarOptions,
					},
				});

				quillInstance.current.on('text-change', () => {
					const html = quillInstance.current?.root.innerHTML || '';
					if (onChange) {
						onChange(html);
					}
				});
			}
		}, [onChange]);

		useImperativeHandle(ref, () => ({
			getEditorContent: () => {
				return quillInstance.current?.root.innerHTML || '';
			},
		}));

		useEffect(() => {
			if (
				quillInstance.current &&
				value !== quillInstance.current.root.innerHTML
			) {
				quillInstance.current.root.innerHTML = value || '';
			}
		}, [value]);

		return <div ref={quillRef} />;
	},
);

export default QuillEditor;
