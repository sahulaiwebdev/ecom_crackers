'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, ShieldAlert, Flame, Volume2, AlertCircle } from 'lucide-react';

interface FirecrackerProductFormState {
  name: string;
  description: string;
  category: string;
  brand: string;
  
  // Firecracker Specific Details
  pesoCertificationNo: string;
  pesoCertificationDate: string;
  productType: 'green' | 'regular' | 'eco-friendly';
  soundLevelDb: number;
  safetyRating: 'a' | 'b' | 'c';
  
  // Legal Compliance
  mandatoryDisclaimer: string;
  ageRestriction: 18;
  requiresLicense: boolean;
  licenseType: 'retailer' | 'distributor' | 'wholesaler';
  
  // Safety & Storage
  storageTemperature: string;
  storageHumidity: string;
  explosiveClass: string;
  hazmatCode: string;
  
  // Packaging & Labels
  requiresWarningLabels: boolean;
  warningLabelsIncluded: boolean;
  instructionSheetIncluded: boolean;
  safetyDataSheetUrl: string;
  
  // Pricing & Stock
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  gstPercentage: number;
  stockQuantity: number;
  minStockAlert: number;
  maxSaleLimit: number;
  
  // Certifications
  eco: boolean;
  isoNumber: string;
  noiseCompliant: boolean;
  chemicalTestingDone: boolean;
}

const initialState: FirecrackerProductFormState = {
  name: '',
  description: '',
  category: '',
  brand: '',
  pesoCertificationNo: '',
  pesoCertificationDate: '',
  productType: 'green',
  soundLevelDb: 125,
  safetyRating: 'a',
  mandatoryDisclaimer: '',
  ageRestriction: 18,
  requiresLicense: true,
  licenseType: 'retailer',
  storageTemperature: '15-25°C',
  storageHumidity: '45-55%',
  explosiveClass: '1.4',
  hazmatCode: '',
  requiresWarningLabels: true,
  warningLabelsIncluded: false,
  instructionSheetIncluded: true,
  safetyDataSheetUrl: '',
  mrp: 0,
  sellingPrice: 0,
  costPrice: 0,
  gstPercentage: 12,
  stockQuantity: 0,
  minStockAlert: 10,
  maxSaleLimit: 100,
  eco: true,
  isoNumber: '',
  noiseCompliant: true,
  chemicalTestingDone: true,
};

export function FirecrackerProductForm() {
  const [formData, setFormData] = useState<FirecrackerProductFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateField = (field: keyof FirecrackerProductFormState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Product name is required');
    if (!formData.pesoCertificationNo) errors.push('PESO certification number is required');
    if (!formData.pesoCertificationDate) errors.push('PESO certification date is required');
    if (!formData.description.trim()) errors.push('Product description is required');
    if (formData.soundLevelDb > 125) errors.push('Sound level must not exceed 125 dB');
    if (formData.mrp <= 0) errors.push('MRP must be greater than 0');
    if (formData.sellingPrice > formData.mrp) errors.push('Selling price cannot exceed MRP');
    if (formData.costPrice >= formData.sellingPrice) errors.push('Cost price must be less than selling price');
    if (!formData.mandatoryDisclaimer.trim()) errors.push('Mandatory disclaimer is required');
    if (!formData.safetyDataSheetUrl.trim()) errors.push('Safety data sheet URL is required');

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Submit to backend API
      console.log('Submitting firecracker product:', formData);
      // const response = await fetch('/api/firecracker-products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (response.ok) {
      //   toast.success('Product created successfully');
      // }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="compliance">PESO Compliance</TabsTrigger>
          <TabsTrigger value="safety">Safety & Storage</TabsTrigger>
          <TabsTrigger value="packaging">Packaging & Labels</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Stock</TabsTrigger>
        </TabsList>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="font-semibold mb-2">Please fix these errors:</div>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Tab 1: Basic Information */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Product Information</CardTitle>
              <CardDescription>Essential product details for firecracker products</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="e.g., Green Sparkler Pro"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand Name *</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => updateField('brand', e.target.value)}
                    placeholder="Brand name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => updateField('category', value)}>
                    <SelectTrigger id="category" className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sparklers">Sparklers</SelectItem>
                      <SelectItem value="fountains">Fountains</SelectItem>
                      <SelectItem value="atom_bombs">Atom Bombs</SelectItem>
                      <SelectItem value="flower_pots">Flower Pots</SelectItem>
                      <SelectItem value="crackers">Crackers</SelectItem>
                      <SelectItem value="ground_chasing">Ground Chasing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="productType">Product Type *</Label>
                  <Select value={formData.productType} onValueChange={(value: any) => updateField('productType', value)}>
                    <SelectTrigger id="productType" className="mt-2">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="green">Green Firecracker (Eco-Friendly)</SelectItem>
                      <SelectItem value="eco-friendly">Eco-Friendly Low Noise</SelectItem>
                      <SelectItem value="regular">Regular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Product Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Detailed product description, features, and benefits"
                  rows={4}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: PESO Compliance */}
        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-orange-600" />
                PESO Certification & Compliance
              </CardTitle>
              <CardDescription>Ministry of Commerce Firecracker Certification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  All products must have valid PESO (Petroleum and Explosives Safety Organisation) certification. Without valid certification, products cannot be legally sold.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="pesoCertNo">PESO Certification Number *</Label>
                  <Input
                    id="pesoCertNo"
                    value={formData.pesoCertificationNo}
                    onChange={(e) => updateField('pesoCertificationNo', e.target.value)}
                    placeholder="e.g., PESO-2024-FC-001"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="pesoCertDate">Certification Date *</Label>
                  <Input
                    id="pesoCertDate"
                    type="date"
                    value={formData.pesoCertificationDate}
                    onChange={(e) => updateField('pesoCertificationDate', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="explosiveClass">Explosive Class *</Label>
                  <Select value={formData.explosiveClass} onValueChange={(value) => updateField('explosiveClass', value)}>
                    <SelectTrigger id="explosiveClass" className="mt-2">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1.1">Class 1.1 (Most Dangerous)</SelectItem>
                      <SelectItem value="1.2">Class 1.2</SelectItem>
                      <SelectItem value="1.3">Class 1.3</SelectItem>
                      <SelectItem value="1.4">Class 1.4 (Firecracker Standard)</SelectItem>
                      <SelectItem value="1.5">Class 1.5</SelectItem>
                      <SelectItem value="1.6">Class 1.6 (Least Dangerous)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="hazmatCode">HAZMAT Code</Label>
                  <Input
                    id="hazmatCode"
                    value={formData.hazmatCode}
                    onChange={(e) => updateField('hazmatCode', e.target.value)}
                    placeholder="e.g., Class D"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="soundLevel">Sound Level (dB) - Max 125dB *</Label>
                  <Input
                    id="soundLevel"
                    type="number"
                    value={formData.soundLevelDb}
                    onChange={(e) => updateField('soundLevelDb', parseInt(e.target.value))}
                    min="0"
                    max="125"
                    className="mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Green crackers must be ≤ 125 dB</p>
                </div>
                <div>
                  <Label htmlFor="safetyRating">Safety Rating *</Label>
                  <Select value={formData.safetyRating} onValueChange={(value: any) => updateField('safetyRating', value)}>
                    <SelectTrigger id="safetyRating" className="mt-2">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A - Safest</SelectItem>
                      <SelectItem value="b">B - Safe</SelectItem>
                      <SelectItem value="c">C - Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="disclaimer">Mandatory Disclaimer *</Label>
                <Textarea
                  id="disclaimer"
                  value={formData.mandatoryDisclaimer}
                  onChange={(e) => updateField('mandatoryDisclaimer', e.target.value)}
                  placeholder="Include all mandatory legal disclaimers for firecracker products..."
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.eco}
                    onCheckedChange={(checked) => updateField('eco', checked)}
                  />
                  <span>Green/Eco-Friendly Firecracker</span>
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Safety & Storage */}
        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-600" />
                Safety & Storage Requirements
              </CardTitle>
              <CardDescription>Proper storage and handling conditions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="storageTemp">Storage Temperature Range *</Label>
                  <Input
                    id="storageTemp"
                    value={formData.storageTemperature}
                    onChange={(e) => updateField('storageTemperature', e.target.value)}
                    placeholder="e.g., 15-25°C"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="storageHumidity">Storage Humidity Range *</Label>
                  <Input
                    id="storageHumidity"
                    value={formData.storageHumidity}
                    onChange={(e) => updateField('storageHumidity', e.target.value)}
                    placeholder="e.g., 45-55%"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2 mb-4">
                  <Checkbox
                    checked={formData.noiseCompliant}
                    onCheckedChange={(checked) => updateField('noiseCompliant', checked)}
                  />
                  <span>Noise Level Compliant</span>
                </Label>
                <Label className="flex items-center gap-2 mb-4">
                  <Checkbox
                    checked={formData.chemicalTestingDone}
                    onCheckedChange={(checked) => updateField('chemicalTestingDone', checked)}
                  />
                  <span>Chemical Testing Completed</span>
                </Label>
              </div>

              <div>
                <Label htmlFor="isoNumber">ISO/Safety Certification Number</Label>
                <Input
                  id="isoNumber"
                  value={formData.isoNumber}
                  onChange={(e) => updateField('isoNumber', e.target.value)}
                  placeholder="e.g., ISO 9001"
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Packaging & Labels */}
        <TabsContent value="packaging">
          <Card>
            <CardHeader>
              <CardTitle>Packaging & Warning Labels</CardTitle>
              <CardDescription>Mandatory labeling and documentation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.requiresWarningLabels}
                    onCheckedChange={(checked) => updateField('requiresWarningLabels', checked)}
                  />
                  <span className="font-semibold">Warning Labels Required</span>
                </Label>

                {formData.requiresWarningLabels && (
                  <>
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.warningLabelsIncluded}
                        onCheckedChange={(checked) => updateField('warningLabelsIncluded', checked)}
                      />
                      <span>Warning Labels Included in Package</span>
                    </Label>
                    <Label className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.instructionSheetIncluded}
                        onCheckedChange={(checked) => updateField('instructionSheetIncluded', checked)}
                      />
                      <span>Instruction Sheet Included</span>
                    </Label>
                  </>
                )}
              </div>

              <div>
                <Label htmlFor="sdsUrl">Safety Data Sheet (SDS) URL *</Label>
                <Input
                  id="sdsUrl"
                  type="url"
                  value={formData.safetyDataSheetUrl}
                  onChange={(e) => updateField('safetyDataSheetUrl', e.target.value)}
                  placeholder="https://..."
                  className="mt-2"
                />
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  All packages must include clear warning labels, manufacturing date, expiry date, and batch number visible on packaging.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Pricing & Stock */}
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock Management</CardTitle>
              <CardDescription>Set prices and manage inventory levels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="mrp">MRP (Maximum Retail Price) *</Label>
                  <Input
                    id="mrp"
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => updateField('mrp', parseFloat(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="sellingPrice">Selling Price *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) => updateField('sellingPrice', parseFloat(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="costPrice">Cost Price *</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => updateField('costPrice', parseFloat(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gst">GST Percentage *</Label>
                <Input
                  id="gst"
                  type="number"
                  value={formData.gstPercentage}
                  onChange={(e) => updateField('gstPercentage', parseFloat(e.target.value))}
                  placeholder="12"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => updateField('stockQuantity', parseInt(e.target.value))}
                    placeholder="0"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="minAlert">Min Stock Alert Level</Label>
                  <Input
                    id="minAlert"
                    type="number"
                    value={formData.minStockAlert}
                    onChange={(e) => updateField('minStockAlert', parseInt(e.target.value))}
                    placeholder="10"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="maxSale">Max Sale Limit per Order</Label>
                  <Input
                    id="maxSale"
                    type="number"
                    value={formData.maxSaleLimit}
                    onChange={(e) => updateField('maxSaleLimit', parseInt(e.target.value))}
                    placeholder="100"
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-2 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
}
