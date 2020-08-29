type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  createTagError: Error | null,
  incomeTagList: Tag[],
  paymentTagList: Tag[],
  tagList: Tag[],
  currentTag?: Tag
  groupedList?: any;
}
type RecordItem = {
  tags: Tag[]
  notes: string
  type: string
  amount: number // 数据类型 object | string
  createdAt?: string  // 类 / 构造函数
}

type Tag = {
  id: string;
  name: string;
  iconName?: string;
  selected?: boolean;
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' // 联合类型
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

type Result = {
  title: string,
  incomeTotal?: number,
  paymentTotal?: number,
  items: RecordItem[]
}[];
