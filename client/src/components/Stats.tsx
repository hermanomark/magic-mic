import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

interface StatsProps {
  stats: {
    total: number;
    forSale: number;
    notForSale: number;
  };
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.total}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">For Sale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.forSale}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Collections</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.notForSale}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default Stats