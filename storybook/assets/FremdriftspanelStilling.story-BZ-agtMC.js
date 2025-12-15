import{aw as w,T as I,j as t,x as k,S as x,cz as j,cH as b,cG as g,cA as u,X as y,c$ as _}from"./iframe-Dp6nHdOg.js";import{w as m,c as D}from"./ContextDecorators-eDVedWAx.js";import{F as N,A as v}from"./FullførtStilling-UenDEpRj.js";import{R as T}from"./GjenåpneStillingKnapp-I38A0jHE.js";import{T as A}from"./TilgangskontrollForInnhold-BaIRB-wW.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DCEF9UD9.js";import"./OrganisasjonsnummerAlert-CuEWXB_R.js";import"./VStack-C5sZiGcO.js";import"./BasePrimitive-DXQCNI91.js";import"./List-BNJVmnt7.js";import"./Link-l82fbgQu.js";import"./KandidatHendelseTag-BQSUv-pa.js";import"./Tag-CV7NXTin.js";import"./ChatExclamationmark-CtBwm2Fa.js";import"./FileXMark-DT-X0bwF.js";import"./Trash-Y6EFmEhJ.js";import"./HandShakeHeart-CrIT-FAb.js";import"./Calendar-L7c72Jnf.js";import"./ThumbUp-C-mqTuPv.js";import"./Table-CXDsAoNd.js";import"./index-CO49fOIc.js";import"./index-B40KJ5b4.js";import"./util-0VcbYtNN.js";import"./DatoVelger-D4w1zCNQ.js";import"./useDatepicker-DhHtfYZC.js";import"./useControllableState-Cfuho32D.js";import"./Modal-okqWqShm.js";import"./floating-ui.react-BGp16BDI.js";import"./Date.Input--SdJUnDs.js";import"./useFormField-TwllRpup.js";import"./ChevronDown-BrwQWDe4.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-O96VxCt4.js";import"./Modal.context-n3x3Fqud.js";import"./Popover-BojWV3Ao.js";import"./DismissableLayer-Dt4vpDcl.js";import"./startOfMonth-CZe3_wxV.js";import"./Select-BVpafOCp.js";import"./endOfMonth-JJzw58yW.js";import"./ArrowLeft-BSkHmmUD.js";import"./ArrowRight-BZTzDjhz.js";import"./isSameDay-BN2DLQFK.js";import"./Checkbox-D4odEdQf.js";import"./Fieldset-CXwcqWjx.js";import"./accordion-BiKynwqm.js";import"./index-BhnfMGU8.js";import"./index-iwDrGyyb.js";import"./index-DTq-RjTT.js";import"./Box-Dz-KHrQR.js";import"./Bell-RTN8EzKM.js";import"./PersonChat-DJ5SWHLI.js";import"./Eye-ARnIF9HZ.js";import"./ProgressBar-BHjjmfxF.js";import"./useLatestRef-8ydpUS_x.js";import"./EyeSlash-CqeSHQ1j.js";import"./CircleSlash-DfENX3go.js";import"./Pencil-DQ-QcAuU.js";import"./FullførStillingModal-Ddo9uYax.js";import"./PersonbrukerTekst-D2_myUON.js";import"./ClockDashed-BclfoD4Y.js";import"./IkonNavnAvatar-D6LC2L9W.js";import"./umamiEvents-DSuxYBjR.js";import"./Tasklist-D8hlZ2UK.js";import"./ErrorBoundary-DIrbvlyn.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
