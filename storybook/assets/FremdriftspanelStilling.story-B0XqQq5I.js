import{ac as I,ad as w,j as t,R as k,S as x,ch as j,cl as b,aG as g,ci as u,aP as y,cx as _}from"./iframe-CYGmpbFx.js";import{w as d,c as D}from"./ContextDecorators-BqbMToMu.js";import{F as N,A as v}from"./FullførtStilling-D_ow6Iz6.js";import{R as T}from"./GjenåpneStillingKnapp-BaddX-7E.js";import{T as A}from"./TilgangskontrollForInnhold-BVxIZi7n.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D625h6bh.js";import"./OrganisasjonsnummerAlert-ApUZM2-e.js";import"./VStack-D1VTWk4O.js";import"./BasePrimitive-CgXjeC8Z.js";import"./List-Cwb2MmIF.js";import"./Link-OSWFCzzX.js";import"./KandidatHendelseTag-DPH4tbvK.js";import"./Tag-DGVfr9rr.js";import"./ChatExclamationmark-Cln-Qvig.js";import"./FileXMark-Q0h4w8uX.js";import"./Trash-Cxpc9wlr.js";import"./HandShakeHeart-BOwI8cHe.js";import"./Calendar-RCVrHvI4.js";import"./ThumbUp-Cim8z76B.js";import"./Table-CqBcmo6t.js";import"./util-gOt3_Pyc.js";import"./format-Dw1SpVLZ.js";import"./match-CivtSffV.js";import"./parseISO-BPtudVCF.js";import"./parse-tmfDgK11.js";import"./getDefaultOptions-DM2GHvKD.js";import"./util-C76tBaN9.js";import"./accordion-CVRsSwv_.js";import"./index-6zHOKkwG.js";import"./index-CYOhW1eM.js";import"./index-DDggMo8H.js";import"./ChevronDown-3z86rFGh.js";import"./Box-aksGuIEm.js";import"./Bell-C0lRVrQm.js";import"./PersonChat-4buNYrl0.js";import"./Eye-Bh6Bvunt.js";import"./ProgressBar-DxqcMjLL.js";import"./EyeSlash-DChuE5Lf.js";import"./CircleSlash-BVdf_xrT.js";import"./Modal-BtW3pjgb.js";import"./floating-ui.react-C_Ji5Bix.js";import"./Date.Input-jZmJ-Pyy.js";import"./useFormField-Bvm5uANL.js";import"./useControllableState-D3hxcXud.js";import"./Modal.context-BnLUGpTN.js";import"./Checkbox-B282mPWR.js";import"./Fieldset-DpJ0OYkn.js";import"./Pencil-1iBmaGGz.js";import"./PersonbrukerTekst-_L5rfqLB.js";import"./ClockDashed-DpxX6Mgm.js";import"./Tasklist-DWY7HGYs.js";import"./ErrorBoundary-BhO25Hrh.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[m],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
