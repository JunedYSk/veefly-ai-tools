import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default function useCampaignsList() {
  // Use toast
  const toast = useToast()

  const refInvoiceListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'id', label: 'Campaign ID', },
    { key: 'video' },
    { key: 'title',label: 'Video Title'  },
    // { key: 'amount', label: 'Budget',  },
    // { key: 'package_name', label: 'Package',  },
    { key: 'status',  },
    { key: 'views', label: 'Views',  },
    // { key: 'is_payed', label: 'Payment',  },
    // { key: 'watchHours', label: 'Watch Hours',  },
    // { key: 'actions' },
  ]
  const tableColumnsMobile = [
    { key: 'id'},
    { key: 'title',label: 'Channel Title'  },
    // { key: 'title' },
    // { key: 'amount' },
    { key: 'status' },
    // { key: 'is_payed', label: 'Payment' },
    // { key: 'views', label: 'Views Delivered' },
    // { key: 'spent', label: 'Spent' },
    // { key: 'actions' },
  ]

  var href = location.href
  var packageId = href.match(/([^\/]*)\/*$/)[1]
  const perPage = ref(10)
  const totalPackages = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const statusFilter = ref('')

  const dataMeta = computed(() => {
    const localItemsCount = refInvoiceListTable.value ? refInvoiceListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalPackages.value,
    }
  })

  const refetchData = () => {
    refInvoiceListTable.value.refresh()
  }

  watch([currentPage, perPage, searchQuery, statusFilter], () => {
    refetchData()
  })

  const fetchCampaigns = (ctx, callback) => {
    store
      .dispatch('app-invoice/fetchCampaigns', {
        status: statusFilter.value,
        page_size: perPage.value,
        belongs_to_cc: packageId,
        page: currentPage.value,
        sort_by: sortBy.value,
        sort_desc: isSortDirDesc.value,
      })
      .then(response => {
        const { invoices, total } = response.data
        // let res = response.data.data.data.map(d => {
        //   d.channel_options = JSON.parse(d.channel_options)

        //   return d
        // })
        callback(response.data.data.data)
        // console.log("setPackages",res);

        totalPackages.value = response.data.data.total;
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching campaign list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveInvoiceStatusVariant = status => {
    if (status == '1') return { variant: 'warning', value: 'Pending' }
    if (status == '2') return { variant: 'success', value: 'Under Review' }
    if (status == '3') return { variant: 'info', value: 'In Progress' }
    if (status == '4') return { variant: 'primary', value: 'Completed' }
    if (status == '5') return { variant: 'danger', value: 'Rejected' }
    if (status == '7') return { variant: 'danger', value: 'Paused' }
    if (status == '8') return { variant: 'danger', value: 'Removed' }
    return { variant: 'secondary', value: 'Invalid' }
  }

  const resolveClientAvatarVariant = status => {
    if (status === 'Partial Payment') return 'primary'
    if (status === 'Paid') return 'danger'
    if (status === 'Downloaded') return 'secondary'
    if (status === 'Draft') return 'warning'
    if (status === 'Sent') return 'info'
    if (status === 'Past Due') return 'success'
    return 'primary'
  }

  const packageStatus = status => {
    if (status == '1') return { variant: 'warning', value: 'Pending' }
    if (status == '2') return { variant: 'success', value: 'Under Review' }
    if (status == '3') return { variant: 'info', value: 'In Progress' }
    if (status == '4') return { variant: 'primary', value: 'Completed' }
    if (status == '5') return { variant: 'danger', value: 'Rejected' }
    if (status == '7') return { variant: 'danger', value: 'Paused' }
    if (status == '8') return { variant: 'danger', value: 'Removed' }
    return { variant: 'secondary', value: 'Invalid' }
  }

  const resolvePaymentStatusVariant = status => {
    if (status == true) return { variant: 'success', value: 'Paid' }
    return { variant: 'danger', value: 'UnPaid' }
  }

  const resolveJson = options => JSON.parse(options)

  return {
    fetchCampaigns,
    tableColumns,
    tableColumnsMobile,
    perPage,
    currentPage,
    totalPackages,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refInvoiceListTable,
    statusFilter,
    resolveInvoiceStatusVariant,
    resolveClientAvatarVariant,
    resolvePaymentStatusVariant,
    refetchData,
    resolveJson,
    packageStatus
  }
}
