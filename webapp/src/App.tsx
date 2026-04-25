import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { UnitsPage } from "./pages/UnitsPage";
import { MenuPage } from "./pages/MenuPage";
import { CartPage } from "./pages/CartPage";
import { PaymentPage } from "./pages/PaymentPage";
import { OrdersPage } from "./pages/OrdersPage";
import { OrderDetailPage } from "./pages/OrderDetailPage";
import { LoyaltyPage } from "./pages/LoyaltyPage";
import { PromosPage } from "./pages/PromosPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ReservationsPage } from "./pages/ReservationsPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="auth" element={<AuthPage />} />
            <Route path="unidades" element={<UnitsPage />} />
            <Route path="cardapio" element={<MenuPage />} />
            <Route path="carrinho" element={<CartPage />} />
            <Route path="pagamento" element={<PaymentPage />} />
            <Route path="pedidos" element={<OrdersPage />} />
            <Route path="pedido/:orderId" element={<OrderDetailPage />} />
            <Route path="fidelidade" element={<LoyaltyPage />} />
            <Route path="promocoes" element={<PromosPage />} />
            <Route path="reservas" element={<ReservationsPage />} />
            <Route path="privacidade" element={<PrivacyPage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
