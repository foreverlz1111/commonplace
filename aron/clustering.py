import akshare as ak
import numpy as np
from matplotlib import pyplot as plt
from sklearn.cluster import KMeans
from sklearn.manifold import TSNE


def save():
    stock.to_csv(f"{stocknum}_{startdate}_{enddate}.csv")
    stock.to_excel(f"{stocknum}_{startdate}_{enddate}.xlsx")


if __name__ == "__main__":
    stocknum = "sh600519"
    startdate = "20230717"
    enddate = "20230721"
    stock = ak.stock_zh_a_daily(symbol=stocknum, start_date=startdate, end_date=enddate,
                                adjust="hfq")
    print(type(stock), stock)

    data = np.array([
        [13972.57, 13972.57, 13777.86, 13804.75],
        [13833.56, 13840.98, 13733.17, 13747.54],
        [13685.38, 13789.03, 13675.72, 13749.13],
        [13788.95, 13956.45, 13741.15, 13757.11],
        [13819.99, 14144.13, 13773.07, 14134.56]
    ])

    # 特征标准化
    data_normalized = (data - data.mean(axis=0)) / data.std(axis=0)

    # 使用 4进行降维
    tsne = TSNE(n_components=2, perplexity=1, random_state=42)
    data_tsne = tsne.fit_transform(data_normalized)

    # 设置聚类数
    n_clusters = 2
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    cluster_labels = kmeans.fit_predict(data_normalized)

    # 可视化聚类结果
    plt.figure(figsize=(8, 6))
    colors = plt.cm.tab10(np.linspace(0, 1, n_clusters))
    for i, color in zip(range(n_clusters), colors):
        plt.scatter(data_tsne[cluster_labels == i, 0], data_tsne[cluster_labels == i, 1], color=color,
                    label=f'Cluster {i}')
    plt.legend()
    plt.xlabel('t-SNE Component 1')
    plt.ylabel('t-SNE Component 2')
    plt.title('t-SNE降维和K-means聚类')
    plt.grid(True)
    plt.show()