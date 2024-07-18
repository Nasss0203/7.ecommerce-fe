import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TableDraft, TablePublish } from '@/components/table';
import { Header } from '@/components/header';

const ProductList = () => {
	return (
		<div className='flex flex-col gap-5'>
			<Header>List Product</Header>
			<Tabs defaultValue='published' className='w-full'>
				<TabsList>
					<TabsTrigger value='all'>All</TabsTrigger>
					<TabsTrigger value='published'>Published</TabsTrigger>
					<TabsTrigger value='drafts'>Drafts</TabsTrigger>
				</TabsList>
				<TabsContent value='all'>Change your password here.</TabsContent>
				<TabsContent value='published'>
					<TablePublish></TablePublish>
				</TabsContent>
				<TabsContent value='drafts'>
					<TableDraft></TableDraft>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ProductList;
