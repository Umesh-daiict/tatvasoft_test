export type StepData = { page: number; total: number };

export type formData = Record<string, string>;

export interface TableComponentProps {
	step: StepData;
	setid: (id: string) => void;
	data: formData[];
	handleUpdate: (data: formData) => void;
	changeStep: (count: number) => void;
}
