export type StepData = { page: number; total: number };

// export type formData = Record<string, string>;
export interface formData {_id?:string, Firstname: string, Lastname: string, Email: string, Phone: string, Status: boolean }

export interface TableComponentProps {
	step: StepData;
	setid: (id: string) => void;
	data: formData[];
	handleUpdate: (data: formData) => void;
	changeStep: (count: number) => void;
}

export type DeleteModelProps = {
	open: boolean;
	onDelete: () => void;
	onClose: () => void;
};

export interface FormComponentProps {
	open: boolean;
	handleClose: (data?: formData[]) => void;
	formType?: 'create' | 'update';
	data: formData | null;
}
