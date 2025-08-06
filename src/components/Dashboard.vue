<template>
  <div class="dashboard-container">
    <!-- Dashboard Header -->
    <div class="dashboard-header">
      <h1>Welcome to K-Trade Securities Dashboard 🎉</h1>
      <Button label="Logout" @click="logout" severity="danger" class="logout-btn" />
    </div>
    
 
    <!-- Dialog Trigger Button -->
    <div class="action-bar">
      <Button label="Create New Alert" @click="showDialog = true" severity="success" raised class="create-alert-btn" />
    </div>

    <!-- Alert Dialog -->
    <Dialog v-model:visible="showDialog" modal header="Create Trading Alert"
      :style="{ width: '50rem', borderRadius: '12px' }" class="alert-dialog">
      <div class="dialog-content">
        <div class="form-grid">
          <!-- Row 1 -->
          <div class="form-group">
            <label class="form-label">Ticker</label>
            <Select v-model="selectedShare" :options="shares" optionLabel="name" class="form-select" />
          </div>

          <div class="form-group">
            <label class="form-label">Buy Price</label>
            <InputNumber v-model="buyPrice" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <div class="form-group">
            <label class="form-label">TP1</label>
            <InputNumber v-model="tp1" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <!-- Row 2 -->
          <div class="form-group">
            <label class="form-label">TP2</label>
            <InputNumber v-model="tp2" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <div class="form-group">
            <label class="form-label">TP3</label>
            <InputNumber v-model="tp3" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <div class="form-group">
            <label class="form-label">TP %</label>
            <InputNumber v-model="tpPercent" class="form-input" suffix="%" mode="decimal" :minFractionDigits="2" />
          </div>

          <!-- Row 3 -->
          <div class="form-group">
            <label class="form-label">Box Break</label>
            <InputNumber v-model="boxBreak" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <div class="form-group">
            <label class="form-label">Dip</label>
            <InputNumber v-model="dip" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>

          <div class="form-group">
            <label class="form-label">Buy SL</label>
            <InputNumber v-model="buySL" class="form-input" mode="decimal" :minFractionDigits="2" />
          </div>
        </div>

        <div class="dialog-actions">
          <Button type="button" label="Save Alert" @click="addProduct" class="action-btn primary"
            :disabled="!selectedShare" />
          <Button type="button" label="Cancel" @click="cancel" class="action-btn secondary" />
        </div>
      </div>
    </Dialog>

    <!-- Alerts Table -->
    <div class="alerts-section">
      <h2 class="section-title">Your Trading Alerts</h2>
      <div class="alerts-table-container">
        <table class="alerts-table">
          <thead>
            <tr>
              <th v-for="header in tableHeaders" :key="header" class="table-header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in $store.state.products" :key="index" class="table-row">
              <td>{{ product.ticker }}</td>
              <td>{{ formatNumber(product.buyPrice) }}</td>
              <td>{{ formatNumber(product.tp1) }}</td>
              <td>{{ formatNumber(product.tp2) }}</td>
              <td>{{ formatNumber(product.tp3) }}</td>
              <td>{{ formatNumber(product.tpPercent) }}%</td>
              <td>{{ formatNumber(product.boxBreak) }}</td>
              <td>{{ formatNumber(product.dip) }}</td>
              <td>{{ formatNumber(product.buySL) }}</td>
              <td class="action-cells">
                <Button icon="pi pi-pencil" @click="editProduct(index)"
                  class="p-button-rounded p-button-text p-button-plain edit-btn" />
                <Button icon="pi pi-trash" @click="deleteProduct(index)"
                  class="p-button-rounded p-button-text p-button-danger" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "primevue/button"
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';

export default {
  name: 'Dashboard',
  components: {
    Button,
    Dialog,
    InputNumber,
    Select
  },
  data() {
    return {
      email2:'email2.com',
      showDialog: false,
      selectedShare: null,
      buyPrice: null,
      tp1: null,
      tp2: null,
      tp3: null,
      tpPercent: null,
      boxBreak: null,
      dip: null,
      buySL: null,
      editingIndex: null,
      shares: [
        { name: 'MARI' },
        { name: 'HCAR' },
        { name: 'PAEL' }
      ],
      tableHeaders: [
        'Ticker', 'Buy Price', 'TP1', 'TP2', 'TP3',
        'TP %', 'Box Break', 'Dip', 'Buy SL', 'Actions'
      ]
    }
  },
  methods: {
    getData(){
      return{
        name:'zain',
        email:this.email2
      }
    },
    getName(name) {
      return name;
    },
    logout() {
      localStorage.setItem('loggedIn', 'false');
      this.$router.push('/login');
    },
    cancel() {
      this.resetForm();
      this.showDialog = false;
    },
    editProduct(index) {
      const product = this.$store.state.products[index];
      this.selectedShare = { name: product.ticker };
      this.buyPrice = parseFloat(product.buyPrice);
      this.tp1 = parseFloat(product.tp1);
      this.tp2 = parseFloat(product.tp2);
      this.tp3 = parseFloat(product.tp3);
      this.tpPercent = parseFloat(product.tpPercent);
      this.boxBreak = parseFloat(product.boxBreak);
      this.dip = parseFloat(product.dip);
      this.buySL = parseFloat(product.buySL);
      this.editingIndex = index;
      this.showDialog = true;
    },
    deleteProduct(index) {
      this.$store.commit('DELETE_PRODUCT', index);
    },
    addProduct() {
      const newProduct = {
        ticker: this.selectedShare?.name || '',
        buyPrice: this.buyPrice?.toString() || '',
        tp1: this.tp1?.toString() || '',
        tp2: this.tp2?.toString() || '',
        tp3: this.tp3?.toString() || '',
        tpPercent: this.tpPercent?.toString() || '',
        boxBreak: this.boxBreak?.toString() || '',
        dip: this.dip?.toString() || '',
        buySL: this.buySL?.toString() || '',
        currentPrice: '',
        changePercent: '',
        shares: '',
        totalAlerts: 0,
        status: 'Active'
      };

      if (this.editingIndex !== null) {
        this.$store.commit('UPDATE_PRODUCT', {
          index: this.editingIndex,
          product: newProduct
        });
        this.editingIndex = null;
      } else {
        this.$store.commit('ADD_PRODUCT', newProduct);
      }

      this.resetForm();
      this.showDialog = false;
    },
    resetForm() {
      this.selectedShare = null;
      this.buyPrice = null;
      this.tp1 = null;
      this.tp2 = null;
      this.tp3 = null;
      this.tpPercent = null;
      this.boxBreak = null;
      this.dip = null;
      this.buySL = null;
    },
    formatNumber(value) {
      if (!value) return '-';
      const num = parseFloat(value);
      return num.toFixed(2);
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  max-width: 1800px;
  margin: 0 auto;
  color: #2d3748;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.dashboard-header h1 {
  font-size: 1.8rem;
  color: #2d3748;
  margin: 0;
}

.logout-btn {
  background: linear-gradient(90deg, #ef4444, #dc2626);
  border: none;
  color: white;
}

.action-bar {
  margin-bottom: 2rem;
}

.create-alert-btn {
  background: linear-gradient(90deg, #10b981, #059669);
  border: none;
  color: white;
}

.alert-dialog {
  border-radius: 12px;
  overflow: hidden;
}

.dialog-content {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.9rem;
  color: #4a5568;
  font-weight: 500;
}

.form-select,
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.3s;
}

.form-select:focus,
.form-input:focus {
  border-color: #818cf8;
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
}

.action-btn.primary {
  background: linear-gradient(90deg, #4f46e5, #7c3aed);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.action-btn.secondary {
  background: #f1f5f9;
  color: #4a5568;
}

.action-btn.secondary:hover {
  background: #e2e8f0;
}

.alerts-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.alerts-table-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.alerts-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.table-header {
  background-color: #f8fafc;
  padding: 1rem;
  text-align: left;
  color: #4a5568;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

.table-row {
  border-bottom: 1px solid #f1f5f9;
}

.table-row td {
  padding: 1rem;
  color: #2d3748;
}

.action-cells {
  display: flex;
  gap: 0.5rem;
}

.edit-btn {
  color: #3b82f6 !important;
}

@media (max-width: 1200px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-container {
    padding: 1rem;
  }

  .alerts-table {
    display: block;
    overflow-x: auto;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>