import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <Layout><div className="py-32 text-center"><div className="skeleton w-32 h-8 mx-auto" /></div></Layout>;
  }

  if (!user || !isAdmin) {
    return (
      <Layout>
        <section className="py-32 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="font-display text-2xl font-bold mb-2">Admin Access Required</h1>
            <p className="text-muted-foreground mb-6">You need admin privileges to access this area.</p>
            <Button asChild><Link to="/login">Sign In</Link></Button>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-8">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Manage Projects', 'View Analytics', 'User Roles'].map((item, i) => (
              <motion.div key={item} className="p-6 rounded-xl border border-border bg-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <h3 className="font-semibold mb-2">{item}</h3>
                <p className="text-sm text-muted-foreground">Coming soon...</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
