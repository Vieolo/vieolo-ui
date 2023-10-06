// Vieolo UI
import IconButton from '../IconButton';
import Typography from '../Typography';
import Flex from '../Flex';
import Spacer from '../Spacer';

// Material UI
import LeftArrowIcon from '@mui/icons-material/ChevronLeftRounded';
import RightArrowIcon from '@mui/icons-material/ChevronRightRounded';
import FirstPageIcon from '@mui/icons-material/FirstPageRounded';
import LastPageIcon from '@mui/icons-material/LastPageRounded';

// Types
import { TablePaginationType } from '../types/types';
import Select from '../Select';


export default function TablePagination(props: {
    pagination: TablePaginationType,
    maxHeight?: string,
    ariaLabel?: string,
}) {


    let itemsText = ""

    if (props.pagination.startIndex && props.pagination.endIndex) {
        itemsText = `${props.pagination.startIndex} - ${props.pagination.endIndex}`

        if (props.pagination.totalIndex) {
            itemsText = `${itemsText} / ${props.pagination.totalIndex}`
        }
    }


    return <div className={`vieolo-table-pagination ${props.maxHeight && 'position--sticky--bottom-0'}`}>
        <Flex justifyContent='space-between' alignItems='center' direction='row-reverse' sm={{direction: 'column'}} rowGap='one'>

            <Flex alignItems='center'>
                <IconButton
                    icon={<FirstPageIcon />}
                    size='small'
                    sm={{size: 'medium'}}
                    onClick={() => props.pagination.onPageChange(1)}
                    disabled={props.pagination.pageNumber === 1}
                    ariaLabel={`${props.ariaLabel || 'table'} pagination first page`}
                />

                <IconButton
                    icon={<LeftArrowIcon />}
                    size='small'
                    sm={{size: 'medium'}}
                    onClick={() => props.pagination.onPageChange(props.pagination.pageNumber - 1)}
                    disabled={props.pagination.pageNumber === 1}
                    ariaLabel={`${props.ariaLabel || 'table'} pagination previous page`}
                />

                <Spacer width='two' />
                <Typography
                    text={`${props.pagination.pageNumber}${props.pagination.totalPageCount !== undefined ? " / " + props.pagination.totalPageCount.toString() : ""}`}
                    fontWeight='bold'
                    dataTestID={`${props.ariaLabel || 'table'} page number`}
                />
                <Spacer width='two' />

                <IconButton
                    icon={<RightArrowIcon />}
                    size='small'
                    sm={{size: 'medium'}}
                    disabled={props.pagination.pageNumber === props.pagination.totalPageCount || !props.pagination.hasNextPage}
                    onClick={() => props.pagination!.onPageChange(props.pagination.pageNumber + 1)}
                    ariaLabel={`${props.ariaLabel || 'table'} pagination next page`}
                />

                {
                    (props.pagination.totalIndex || props.pagination.totalPageCount) &&
                    <IconButton
                        icon={<LastPageIcon />}
                        size='small'
                        sm={{size: 'medium'}}
                        disabled={props.pagination.pageNumber === props.pagination.totalPageCount || !props.pagination.hasNextPage}
                        ariaLabel={`${props.ariaLabel || 'table'} pagination last page`}
                        onClick={() => {
                            if (props.pagination.totalPageCount) {
                                props.pagination.onPageChange(props.pagination.totalPageCount)
                            } else if (props.pagination.totalIndex) {
                                props.pagination.onPageChange(Math.ceil(props.pagination.totalIndex / props.pagination.pageItemCount));
                            }
                        }}
                    />
                }
            </Flex>

            {
                (props.pagination.onPageItemCountChange || itemsText.trim().length > 0) &&
                <Flex alignItems='center' columnGap='two'>
                    {
                        props.pagination.onPageItemCountChange &&
                        <Flex alignItems='center' columnGap='one'>
                            <Typography text={props.pagination.itemsPerPageText || `Items per page`} type='caption-large' />
                            <Select
                                error={false}
                                selectedItems={[props.pagination.pageItemCount.toString()]}
                                width='small'
                                onSelect={v => {
                                    if (props.pagination.onPageItemCountChange) {
                                        props.pagination.onPageItemCountChange(+v[0])
                                    }
                                }}
                                items={(props.pagination.pageItemCountOptions || [10, 15, 20, 25]).map(z => {
                                    return {
                                        title: z.toString(),
                                        value: z.toString(),
                                    }
                                })}
                            />
                        </Flex>
                    }
                    <Typography text={itemsText} fontWeight='bold' />
                </Flex>
            }

        </Flex>
    </div>

}
