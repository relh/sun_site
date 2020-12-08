#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

import pdb
import os
import numpy as np
import torch
import matplotlib.pyplot as plt

gts = '/home/relh/Code/sun_site/ground_truths/'
preds = '/home/relh/Code/sun_site/predictions/'
outputs = '/home/relh/Code/sun_site/images/'

print(os.listdir(gts + 'yearputs/'))

for target in ['field']:#, 'inclination', 'azimuth', 'vlos_mag', 'eta_0', 'dop_width', 'src_continuum', 'src_grad']:
#for target in ['vlos_mag', 'eta_0', 'dop_width', 'src_continuum', 'src_grad']:

    min_limit = 0.0 
    image_colormap = plt.get_cmap('viridis')
    if 'azimuth' in target:
        image_colormap = plt.get_cmap('twilight')
        max_limit = 180.0
    elif 'inclination' in target:
        image_colormap = plt.get_cmap('Spectral')
        max_limit = 180.0
    elif 'field' in target or 'b_fill_factor' in target:
        image_colormap = plt.get_cmap('plasma')
        max_limit = 5000.0
    elif 'vlos_mag' in target:
        image_colormap = plt.get_cmap('coolwarm')
        min_limit = -700000.0
        max_limit = 700000.0
    elif 'eta_0' in target:
        image_colormap = plt.get_cmap('cividis')
        max_limit = 50.0
    elif 'dop_width' in target:
        image_colormap = plt.get_cmap('BuPu')
        max_limit = 60.0
    elif 'src_continuum' in target:
        image_colormap = plt.get_cmap('Greens')
        max_limit = 29060.61
    elif 'src_grad' in target:
        image_colormap = plt.get_cmap('Purples')
        max_limit = 52695.32
    image_colormap.set_bad('black', 1.)

    for setting in ['monthputs']: #, 'monthputs']:
        gt_files = sorted(os.listdir(gts + setting + '/' + target + '/'))
        pred_files = sorted(os.listdir(preds + setting + '/' + target + '/'))
        #with open(f'{setting}-{target}.json', 'w') as f:
        #    pred_dump = [x.split('_')[0] + '_' + x.split('_')[1] for x in pred_files]
        #    json.dump(pred_dump, f)
        field_files = sorted(os.listdir(gts + setting + '/' + 'field' + '/'))

        '''
        for gt_file, pred in zip(gt_files, pred_files):
            date = pred.split('_')[0] + '_' + pred.split('_')[1]
            new_name = gts + setting + '/' + target + '/' + date + '_groundtruth.pkl'
            os.rename(gts + setting + '/' + target + '/' + gt_file, new_name)
            print(new_name)
        for idx, gt_file in enumerate(gt_files):
            if idx == 0:
                date = '20160201_003600'
            else:
                date = gt_files[idx-1].split('_')[0] + '_' + gt_files[idx-1].split('_')[1]
            new_name = gts + setting + '/' + target + '/' + date + '_groundtruth.pkl'
            os.rename(gts + setting + '/' + target + '/' + gt_file, new_name)
            print('old name')
            print(gt_file)
            print('new name')
            print(new_name)
        '''

        for i, pred in enumerate(pred_files):
            pred_disk_tensor = torch.zeros((4096, 4096), requires_grad=False, device='cpu')
            gt_disk_tensor = torch.zeros((4096, 4096), requires_grad=False, device='cpu')
            field_disk_tensor = torch.zeros((4096, 4096), requires_grad=False, device='cpu')

            date = pred.split('_')[0] + '_' + pred.split('_')[1]
            print(date)
            gt = [x for x in gt_files if date in x]
            if len(gt) == 0: continue
            else: 
                gt = gt[0]
                field = [x for x in field_files if date in x][0]

            #print(os.path.exists(gts + date + '_groundtruth.pkl'))
            #print(gts + date + '_groundtruth.pkl')
            gt_tensor = torch.load(gts + setting + '/' + target + '/' + gt)
            pred_tensor = torch.load(preds + setting + '/' + target + '/' + pred)
            field_tensor = torch.load(gts + setting + '/' + 'field' + '/' + gt)

            for sub_i in range(16):
                x = sub_i // 4
                y = sub_i % 4
                gt_disk_tensor[x*1024:(x+1)*1024, y*1024:(y+1)*1024] = gt_tensor[sub_i]
                pred_disk_tensor[x*1024:(x+1)*1024, y*1024:(y+1)*1024] = pred_tensor[sub_i]
                field_disk_tensor[x*1024:(x+1)*1024, y*1024:(y+1)*1024] = field_tensor[sub_i]

            gt_disk_tensor[field_disk_tensor <= 0.7] = np.nan
            pred_disk_tensor[field_disk_tensor <= 0.7] = np.nan

            plt.imsave(outputs + setting + '/' + target + '/' + date + '_gt_image.jpg', gt_disk_tensor, cmap=image_colormap, vmin=min_limit, vmax=max_limit)#, vmin=-maxmin, vmax=maxmin)
            plt.imsave(outputs + setting + '/' + target + '/' + date + '_pred_image.jpg', pred_disk_tensor, cmap=image_colormap, vmin=min_limit, vmax=max_limit)#, vmin=-maxmin, vmax=maxmin)

            #if i == 10: break
